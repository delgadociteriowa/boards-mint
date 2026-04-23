import connectDB from '@/config/database';
import User from '@/models/User';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: Promise<{
    token?: string;
  }>;
};

// user gets here with email link

const VerifyEmail = async ({ searchParams }: Props) => {
  // verification token in db and email
  const { token } = await searchParams;

  // there is no token. basic div must be changed to redirection no-token page
  if (!token) {
    redirect('/verify-notoken');
  }

  await connectDB();

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: new Date() },
  });

  // The token is invalid or expired. basic div must be changed to redirection to invalid-token page. also click to regenerate token.
  if (!user) {
    redirect('/verify-expired');
  }

  // the account gets verified, the verification token gets empty and the expiration too
  user.emailVerified = true;
  user.verificationToken = null;
  user.verificationTokenExpires = null;

  // the user gets saved
  await user.save();

  // everything ok. basic redirection must be changed to verified page with go to login button
  redirect('/verified-email');
};

export default VerifyEmail;
