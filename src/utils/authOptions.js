import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        //logic that reurns object with user info or null if login is invalid
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        await connectDB();

        const user = await User.findOne({ username: credentials.username });
        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        // what is returned here goes to session.user
        return {
          id: user._id.toString(),
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.firstname = user.firstname;
        token.lastname = user.lastname;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.firstname = token.firstname;
      session.user.lastname = token.lastname;
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
