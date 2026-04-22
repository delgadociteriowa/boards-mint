import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

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

    return Response.json(newUser, { status: 201 });
  } catch (error) {
    console.error('CREATE USER ERROR:', error);
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
