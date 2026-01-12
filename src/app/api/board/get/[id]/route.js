import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/database';
import Board from '@/models/Board';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { id } = await params;

    if (!id) {
      return Response.json({ error: 'Board id is required' }, { status: 400 });
    }

    const board = await Board.findOne({
      _id: id,
      owner: userId,
    })
      .select('-selectedSqr -phaseTwo')
      .lean();

    if (!board) {
      return Response.json({ error: 'Board not found' }, { status: 404 });
    }

    return Response.json(board, { status: 200 });
  } catch (error) {
    console.error('Error fetching board:', error);
    return Response.json(
      { error: 'Internal Server Error board' },
      { status: 500 }
    );
  }
}
