import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/page",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "",
      clientSecret: process.env.FACEBOOK_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Check if credentials contain required fields
          if (!credentials?.username || !credentials?.password) {
            return null;
          }

          // Query the database to find the user
          const existingUser = await db.user.findUnique({
            where: { username: credentials?.username },
          });

          // Check if the user exists
          if (!existingUser) {
            return null;
          }

          // Compare the passwords
          const passwordMatch = await compare(
            credentials.password,
            existingUser.password,
          );

          // Check if passwords match
          if (!passwordMatch) {
            return null;
          }

          // Additional checks or validations
          // ...

          // Continue with your custom endpoint logic
          const res = await fetch("/your/endpoint", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();

          // Check if the response is OK and user is received
          if (res.ok && user) {
            return user;
          }

          // Handle other scenarios or errors
          console.error("Authentication failed:", res.statusText);
          return null;
        } catch (error) {
          // Handle unexpected errors
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
};

// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import GithubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { compare } from "bcrypt";
// import { db } from "./db";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(db),
//   session: {
//     strategy: "jwt",
//   },
//   pages: {
//     signIn: "/page",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID ?? "",
//       clientSecret: process.env.GOOGLE_SECRET ?? "",
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_ID ?? "",
//       clientSecret: process.env.FACEBOOK_SECRET ?? "",
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID ?? "",
//       clientSecret: process.env.GITHUB_SECRET ?? "",
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password) {
//           return null;
//         }

//         const existingUser = await db.user.findUnique({
//           where: { username: credentials?.username },
//         });

//         if (!existingUser) {
//           return null;
//         }

//         const passwordMatch = await compare(
//           credentials.password,
//           existingUser.password,
//         );

//         if (!passwordMatch) {
//           return null;
//         }

//         return {
//           id: `${existingUser.id}`,
//           name: existingUser.username,
//         };
//       },
//     }),
//   ],
// };
