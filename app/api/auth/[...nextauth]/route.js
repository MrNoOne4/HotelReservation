// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import bcrypt from "bcrypt";
// import { prisma } from "../../../../hello-prisma/lib/prisma";
// import { redirect } from "next/navigation";
// import { NextResponse, NextRequest } from "next/server";

// export const authOptions = {
//   // adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await prisma.users.findUnique({
//           where: { gmail: credentials.email },
//         });

//         if (!user || !user.userPassword) return null;

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.userPassword,
//         );
//         if (!isValid) return null;

//         return {
//           id: user.userID,
//           name: `${user.firstName} ${user.lastName}`,
//           email: user.gmail,
//         };
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       authorization: { params: { scope: "public_profile" } },
//     }),
//   ],

//   session: { strategy: "jwt" },
//   callbacks: {
//     async signIn({ user, account }) {
//       // Allow all sign-ins regardless of existing accounts
//       return true;
//     },
//     async jwt({ token, user, account, profile }) {
//       if (account?.provider === "google") {
//         token.id = profile?.sub;
//         token.provider = "google";
//       }
//       if (user) {
//         token.id = user.id ?? user.sub;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import { prisma } from "../../../../hello-prisma/lib/prisma";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";

// export const authOptions = {
//   // adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await prisma.users.findUnique({
//           where: { GuestEmail: credentials.email },
//         });

//         if (!user || !user.GuestPassword) {
//           throw new Error(
//             "This email is registered via OAuth. Please login with your provider.",
//           );
//         }

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.GuestPassword,
//         );
//         if (!isValid) return null;

//         return {
//           id: user.GuestId,
//           name: `${user.GuestFullName}`,
//           email: user.GuestEmail,
//         };
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       authorization: { params: { scope: "public_profile" } },
//     }),
//   ],

//   session: { strategy: "jwt" },
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (account?.provider === "google" || account?.provider === "facebook") {
//         const email = user.email;
//         if (!email) return false;

//         const existingUser = await prisma.users.findUnique({
//           where: { GuestEmail: email },
//         });

//         if (existingUser) {
//           return true;
//         } else {
//           await prisma.users.create({
//             data: {
//               GuestEmail: email,
//               GuestFullName: user.name ?? "",
//               GuestPassword: "",
//               isVerified: true,
//             },
//           });
//           return true;
//         }
//       }

//       return true;
//     },

//     async jwt({ token, user, account, profile }) {
//       if (user) {
//         token.email = user.email;
//       }
//       if (account?.provider === "google" || account?.provider === "facebook") {
//         token.provider = account.provider;
//         const dbUser = await prisma.users.findUnique({
//           where: { GuestEmail: user.email ?? "" },
//         });
//         token.id = dbUser.GuestId;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.provider = token.provider;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "../../../../hello-prisma/lib/prisma";
import {NextRequest, NextResponse} from "next/server";

export const authOptions = {
  providers: [
    // Credentials login
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
        // User registered via OAuth
        throw new Error(
          "This email is registered via OAuth. Please login with your provider."
        );
      }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.GuestPassword,
        );

        if (!isValid) {
          throw new Error("Invalid password");
        };

        return {
          id: user.GuestId,
          name: user.GuestFullName,
          email: user.GuestEmail,
        };
      },
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // Facebook OAuth
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      authorization: { params: { scope: "public_profile email" } },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
       return baseUrl;
    },

    // Runs after sign-in
    async signIn({ user, account, profile }) {
      if (account?.provider === "google" || account?.provider === "facebook") {
        
          const existingAccount = await prisma.guestaccount.findFirst({
            where: {
              provider: account.provider,
              provider_id: account.providerAccountId,
            },
          });

          if (existingAccount) {
            return true;
          }

        let email = user.email ?? profile?.email;

        let existingUser = null;

        if (email) {
          existingUser = await prisma.users.findUnique({
            where: { GuestEmail: email },
          });
        };

        // Check if user exists
        if (existingUser) {
            await prisma.guestaccount.create({
              data: {
                GuestId: existingUser.GuestId,
                provider: account.provider,
                provider_id: account.providerAccountId,
              },
            });

            return true;
          }
        if (!email) {
          email = `${account.providerAccountId}@${account.provider}.com`;
        }

        const newUser = await prisma.users.create({
              data: {
                GuestEmail: email,
                GuestFullName: user.name ?? "",
                GuestPassword: " ",
                isVerified: true,
              },
            });

            await prisma.guestaccount.create({
              data: {
                GuestId: newUser.GuestId,
                provider: account.provider,
                provider_id: account.providerAccountId,
              },
            });

            return true;
          }

          return true;
    },

    // Customize JWT token
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      if (account?.provider) {
        token.provider = account.provider;
      }

      return token;
    },

    // Customize session sent to client
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
