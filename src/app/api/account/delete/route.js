import connectDB from '@/config/database';
import Board from '@/models/Board';
import User from '@/models/User';
import { authOptions } from '@/utils/authOptions';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';

export async function DELETE() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  const mongoSession = await mongoose.startSession();

  try {
    mongoSession.startTransaction();

    // 1. eliminar boards del usuario
    await Board.deleteMany({ owner: userId }).session(mongoSession);

    // 2. eliminar usuario
    const deletedUser =
      await User.findByIdAndDelete(userId).session(mongoSession);

    if (!deletedUser) {
      await mongoSession.abortTransaction();
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    await mongoSession.commitTransaction();

    return Response.json({
      message: 'Your account and all associated boards have been deleted.',
    });
  } catch (error) {
    await mongoSession.abortTransaction();
    console.error(error);

    return Response.json(
      { error: 'Failed to delete user data' },
      { status: 500 },
    );
  } finally {
    mongoSession.endSession();
  }
}
