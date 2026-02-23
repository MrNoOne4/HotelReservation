// lib/auth.ts
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
// If using Prisma
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../hello-prisma/lib/prisma";

export const authOptions = {
  // Optional: Prisma adapter if you want DB storage
  // adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { prompt: "consent", access_type: "offline", response_type: "code" },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: { params: { scope: "public_profile" } },
    }),
  ],

  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // ⚠️ use token here
      return session;
    },
  },
};