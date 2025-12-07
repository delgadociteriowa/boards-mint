import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/database';
import User from '@/models/User';

export async function POST(req) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { firstname, lastname } = await req.json();

  const updated = await User.findByIdAndUpdate(
    session.user.id,
    {
      ...(firstname !== undefined && { firstname }),
      ...(lastname !== undefined && { lastname }),
    },
    { new: true }
  );

  return Response.json({
    firstname: updated.firstname,
    lastname: updated.lastname,
  });
}
