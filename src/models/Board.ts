import { Schema, model, models, Document, Model } from 'mongoose';
import { SelectedGame, Grid, SelectedSquare } from '@/types/board';

export interface IBoard extends Document {
  owner: string;
  selectedGame: SelectedGame;
  gameGrid: Grid;
}

const BoardSchema = new Schema<IBoard>(
  {
    owner: {
      type: String,
      required: true,
    },
    selectedGame: {
      type: String,
      required: true,
    },
    gameGrid: {
      type: [[Schema.Types.Mixed]],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Board: Model<IBoard> =
  models.Board || model<IBoard>('Board', BoardSchema);

export default Board;