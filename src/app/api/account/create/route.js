import connectDB from '@/config/database';
import User from '@/models/User';

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

    const newUser = await User.create({
      email,
      username,
      firstName,
      lastName,
      password,
    });

    return Response.json(newUser, { status: 201 });
  } catch (error) {
    return Response.json(
      { message: 'Error creating user', error: error.message },
      { status: 500 },
    );
  }
}
