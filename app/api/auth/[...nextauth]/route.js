import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../hello-prisma/lib/prisma";


export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.users.findUnique({
          where: { Email: credentials.email },
        });

        if (!user) {
          throw new Error("No account found with this email");
        }

        // "null" string check covers OAuth users who have no real password
        if (!user.PasswordHash) {
          throw new Error(
            "This email is registered via OAuth. Please login with your provider."
          );
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.PasswordHash
        );

        if (!isValid) throw new Error("Invalid password");

        return {
          id: String(user.UserId),
          name: user.FullName,
          email: user.Email,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { prompt: "consent", access_type: "offline", response_type: "code" },
      },
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: { params: { scope: "public_profile email" } },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: { signIn: "/", error: "/" },

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (!url) return baseUrl;
      try {
        let decodedUrl = decodeURIComponent(url.trim());
        return decodedUrl.split("&error=")[0];
      } catch {
        return baseUrl;
      }
    },

    async signIn({ user, account, profile }) {
      if (!account) return true;

      const providerId = account.providerAccountId;
      const providerName = account.provider;

      // Only allow providers defined in your enum


      const safeProvider = providerName === "google" ? "Google" : providerName === "facebook" ? "Facebook" : null;

      let email =
        user.email ?? profile?.email ?? `${providerId}@${providerName}.com`;

      let existingUser = await prisma.users.findUnique({
        where: { Email: email },
      });

      if (existingUser) {
        const existingAccount = await prisma.userauthproviders.findFirst({
          where: { UserId: existingUser.UserId, Provider: safeProvider },
        });

        if (!existingAccount) {
          await prisma.userauthproviders.create({
            data: {
              UserId: existingUser.UserId,
              Provider: safeProvider,
              ProviderUserId: providerId ?? null,
            },
          });
        }

        user.id = String(existingUser.UserId);
        user.email = existingUser.Email;
        user.name = existingUser.FullName;
        return true;
      }

      const newUser = await prisma.users.create({
        data: {
          Email: email,
          FullName: user.name ?? "",
          PasswordHash: "",   
          IsVerified: true,
        },
      });

      await prisma.userauthproviders.create({
        data: {
          UserId: newUser.UserId,
          Provider: safeProvider,
          ProviderUserId: providerId ?? null,
        },
      });

      user.id = String(newUser.UserId);
      user.email = newUser.Email;
      user.name = newUser.FullName;
      return true;
    },

    async jwt({token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.provider = account?.provider ?? token.provider ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.provider = token.provider ?? null;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };