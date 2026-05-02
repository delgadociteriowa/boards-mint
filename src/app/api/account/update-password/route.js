import connectDB from '@/config/database';
import User from '@/models/User';
import { authOptions } from '@/utils/authOptions';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth';

export async function PATCH(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return Response.json({ error: 'Missing data' }, { status: 400 });
    }

    const user = await User.findById(session.user.id).select('+password');

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return Response.json(
        { error: 'Invalid current password' },
        { status: 401 },
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return Response.json({ success: true });
  } catch (error) {
    console.error('UPDATE PASSWORD ERROR:', error);

    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
