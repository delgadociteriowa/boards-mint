import connectDB from '@/config/database';
import User from '@/models/User';

export async function POST(req) {
  try {
    await connectDB();

    const { email, username } = await req.json();

    if (!email || !username) {
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
    });

    return Response.json(newUser, { status: 201 });
  } catch (error) {
    const mongoCode = error?.code || error?.cause?.code;

    //implement already registered on change
    // if (mongoCode === 11000) {
    //   return Response.json(
    //     {
    //       message:
    //         'The email has been already registered. Please sign in or sign up with another email.',
    //     },
    //     { status: 409 },
    //   );
    // }

    return Response.json(
      { message: 'Error creating user', error: error.message },
      { status: 500 },
    );
  }
}
