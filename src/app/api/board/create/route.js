import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/database';
import Board from '@/models/Board';

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const body = await req.json();
    const { gameGrid, selectedGame } = body;

    const newBoard = await Board.create({
      owner: userId,
      gameGrid: gameGrid ?? undefined,
      selectedGame: selectedGame ?? undefined,
    });

    return Response.json(newBoard, { status: 201 });
  } catch (error) {
    console.error('Error creating board:', error);
    return Response.json(
      { error: 'Internal Server Error board' },
      { status: 500 },
    );
  }
}
