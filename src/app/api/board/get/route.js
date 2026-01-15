import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/database';
import Board from '@/models/Board';

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = session.user.id;

    const boards = await Board.find({ owner: userId })
      .select('-gameGrid -selectedSqr -phaseTwo')
      .sort({ lastSaved: -1 })
      .lean();

    return Response.json(boards, { status: 200 });
  } catch (error) {
    console.error('Error fetching boards:', error);
    return Response.json(
      { error: 'Internal Server Error board' },
      { status: 500 }
    );
  }
}
