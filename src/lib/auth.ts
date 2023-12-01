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
  secret: process.env.NEXTAUTH_URL_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
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

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        return {
          ...token,
          username: user.username,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
        },
      };
    },
  },
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
