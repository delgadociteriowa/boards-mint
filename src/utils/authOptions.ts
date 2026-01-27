import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from "next-auth";
import bcrypt from 'bcryptjs';
import connectDB from '@/config/database';
import User from '@/models/User';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./env";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'username / email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        //logic that reurns object with user info or null if login is invalid
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }

        await connectDB();

        const { identifier, password } = credentials;

        const isEmail = identifier.includes('@');

        const user = await User.findOne(
          isEmail
            ? { email: identifier.toLowerCase() }
            : { username: identifier }
        );

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;

        // what is returned here goes to session.user
        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        };
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account?.provider === "credentials") {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        return token;
      }

      if (account?.provider === "google") {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.username = dbUser.username;
          token.email = dbUser.email;
        }
      }

      return token
    },

    async signIn({ user, profile, account }) {
      if (account?.provider !== "google") {
        return true;
      }

      if (!profile?.email) return false;

      await connectDB();
      const userExist = await User.findOne({ email: profile.email })
      if (!userExist) {
        const username = 
          profile.name?.replace(/\s+/g, "").toLowerCase().slice(0, 20) ??
          profile.email.split("@")[0];

        await User.create({
          email: profile.email,
          username,
        });
      }
      return true
    },

    async session({ session, token }) {
      await connectDB();
      const user = await User.findById(token.id);

      if (!user) return session;

      session.user.id = token.id;
      session.user.username = token.username;
      session.user.firstname = user.firstname;
      session.user.lastname = user.lastname;

      if (token.email) {
        session.user.email = token.email;
      }

      return session;
    },
  },

  pages: {
    signIn: '/login', // custom form
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// session: uses JWT by default
// pages: use the custom login
// secret: mandatory to sign JWT
