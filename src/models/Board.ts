import { Schema, model, models, Document, Model } from 'mongoose';
import { SelectedGame, Grid, SelectedSquare } from '@/state/board/boardTs';

export interface IBoard extends Document {
  owner: string;
  selectedGame: SelectedGame;
  gameGrid: Grid;
  selectedSqr: SelectedSquare;
  phaseTwo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BoardSchema = new Schema<IBoard>(
  {
    owner: {
      type: String,
      required: true,
    },
    selectedGame: {
      type: Schema.Types.Mixed,
      required: true,
    },
    gameGrid: {
      type: Schema.Types.Mixed,
      required: true,
    },
    selectedSqr: {
      type: Schema.Types.Mixed,
      required: true,
    },
    phaseTwo: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Board: Model<IBoard> =
  models.Board || model<IBoard>('Board', BoardSchema);

export default Board;