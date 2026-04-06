import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import  { prisma }  from "../../../../hello-prisma/lib/prisma";

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
          where: { GuestEmail: credentials.email },
        });

        if (!user) {
          throw new Error("No account found with this email");
        }

        if (!user.GuestPassword) {
          throw new Error(
            "This email is registered via OAuth. Please login with your provider."
          );
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.GuestPassword
        );

        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.GuestId,
          name: user.GuestFullName,
          email: user.GuestEmail,
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
     strategy: "jwt" 
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

      let email = user.email ?? profile?.email ?? `${providerId}@${providerName}.com`;

      let existingUser = await prisma.users.findUnique({
        where: { GuestEmail: email },
      });

      if (existingUser) {
        const existingAccount = await prisma.guestaccount.findFirst({
          where: { GuestId: existingUser.GuestId, provider: providerName },
        });

        if (!existingAccount) {
          await prisma.guestaccount.create({
            data: {
              GuestId: existingUser.GuestId,
              provider: providerName,
              provider_id: providerId ? String(providerId) : null,
            },
          });
        }

        user.id = existingUser.GuestId;
        user.email = existingUser.GuestEmail;
        user.name = existingUser.GuestFullName;
        return true;
      }

      // Create a new user if none exists
      const newUser = await prisma.users.create({
        data: {
          GuestEmail: email,
          GuestFullName: user.name ?? "",
          GuestPassword: "null", 
          isVerified: true,
        },
      });

      // Link OAuth provider
      await prisma.guestaccount.create({
        data: {
          GuestId: newUser.GuestId,
          provider: providerName,
          provider_id: providerId ? String(providerId) : null,
        },
      });

      // Return the new user
      user.id = newUser.GuestId;
      user.email = newUser.GuestEmail;
      user.name = newUser.GuestFullName;
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.provider = account?.provider ?? token.provider ?? null;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.provider = token.provider ?? null;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };