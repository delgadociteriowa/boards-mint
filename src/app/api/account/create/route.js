import connectDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await connectDB();

    const { email, username, firstName, lastName, password } = await req.json();

    if (!email || !username || !firstName || !lastName || !password) {
      return Response.json(
        {
          message:
            "There are required fields that hasn't been found in the request.",
        },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      username,
      firstName,
      lastName,
      password: hashedPassword,
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
