import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/database';
import Board from '@/models/Board';

export async function PATCH(req, { params }) {
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

    const body = await req.json();
    const { gameGrid } = body;

    if (!gameGrid) {
      return Response.json({ error: 'gameGrid is required' }, { status: 400 });
    }

    const updatedBoard = await Board.findOneAndUpdate(
      { _id: id, owner: userId },
      {
        gameGrid,
        lastSaved: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!updatedBoard) {
      return Response.json(
        { error: 'Board not found or not authorized' },
        { status: 404 }
      );
    }

    return Response.json(updatedBoard, { status: 200 });
  } catch (error) {
    console.error('Error updating gameGrid:', error);
    return Response.json(
      { error: 'Internal Server Error board' },
      { status: 500 }
    );
  }
}
