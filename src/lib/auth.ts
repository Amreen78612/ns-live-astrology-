// src/lib/auth.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { Adapter } from "next-auth/adapters";

import bcrypt from "bcrypt";
import { db } from "./drizzle"; // Fixed import path
import { users } from "../db/schema"; // Drizzle schema
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          console.log("❌ Missing credentials");
          return null;
        }

        try {
          // find user by email (case-insensitive safe compare if you want)
          const [userRow] = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email));

          if (!userRow) {
            console.log(`❌ User not found: ${credentials.email}`);
            return null;
          }

          console.log(`✅ User found: ${userRow.email}`);

          // userRow.password should be the bcrypt-hashed password
          const hashed = userRow.password as string | undefined;
          if (!hashed) {
            console.log("❌ User has no password");
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, hashed);
          if (!isValid) {
            console.log("❌ Password mismatch");
            return null;
          }

          console.log("✅ Login successful!");

          // Return a user object that NextAuth expects
          return {
            id: String(userRow.id),
            name: userRow.name ?? undefined,
            email: userRow.email,
            role: userRow.role ?? "user",
          } as any;
        } catch (error) {
          console.error("❌ Auth error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // Attach role from user on initial sign in
      if (user) {
        // user.role might be present from authorize()
        if ((user as any).role) token.role = (user as any).role;
        if ((user as any).id) token.id = (user as any).id;
      }
      return token;
    },

    async session({ session, token }) {
      // Expose token.role/id on session for client-side checks
      if (token && session.user) {
        (session.user as any).role = (token as any).role ?? "user";
        (session.user as any).id = (token as any).id ?? null;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authOptions);
