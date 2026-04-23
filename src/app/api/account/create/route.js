import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    await connectDB();

    const { email, username, firstname, lastname, password } = await req.json();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,50}$/;

    if (!email || !username || !firstname || !password) {
      return Response.json(
        {
          message:
            "There are required fields that hasn't been found in the request.",
        },
        { status: 400 },
      );
    }

    if (!passwordRegex.test(password)) {
      return Response.json(
        {
          message:
            'Password must contain uppercase, lowercase, number and special character',
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomBytes(32).toString('hex');

    // token expires in one hour
    const newUser = await User.create({
      email,
      username,
      firstname,
      lastname,
      password: hashedPassword,
      emailVerified: false,
      verificationToken,
      verificationTokenExpires: new Date(Date.now() + 1000 * 60 * 60),
    });

    await resend.emails.send({
      from: 'Boards <onboarding@resend.dev>',
      to: 'delgadociteriowa@gmail.com',
      subject: 'Confirm your account now!',
      html: `
        <h2>Welcome</h2>
        <p>Please click the following link to verify your account:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}">
          Verify email account
        </a>
      `,
    });

    return Response.json(newUser, { status: 201 });
  } catch (error) {
    // check duplicated
    const mongoCode = error?.code || error?.cause?.code;

    if (mongoCode === 11000) {
      const duplicatedField = Object.keys(
        error?.keyPattern || error?.cause?.keyPattern || {},
      )[0];

      return Response.json(
        {
          message: `${duplicatedField} is already in use.`,
        },
        { status: 409 },
      );
    }

    return Response.json(
      { message: 'Error creating user', error: error.message },
      { status: 500 },
    );
  }
}
