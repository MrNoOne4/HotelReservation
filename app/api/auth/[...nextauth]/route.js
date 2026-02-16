import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.todolistaccount.findFirst({
          where: { gmail: credentials.email },
        });

        if (!user) return null;

        const isValid = await compare(credentials.password, user.userPassword);

        if (!isValid) return null;

        // Return object that will be stored in session
        return { id: user.id, email: user.gmail, firstName: user.firstName };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
