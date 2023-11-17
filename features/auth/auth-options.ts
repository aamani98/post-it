import prisma from "@/prisma";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

const AUTH_OPTIONS: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.log("No email and password");
          throw new Error("Email and Password are required");
        }
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) {
          console.log("No user found");
          throw new Error("Incorrect Email or Password");
        }
        const isPasswordValid = await compare(
          credentials?.password,
          user.hashed_password
        );

        if (!isPasswordValid) {
          console.log("Password not valid");
          throw new Error("Incorrect Email or Password");
        }
        return {
          id: user.id.toString(),
          email: user.email,
          username: user.username,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
};

export default AUTH_OPTIONS;
