import { Schema, model, models, Document, Model } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: [true, 'Your first name is required'],
    },
    lastname: {
      type: String,
      required: [true, 'Your last name is required'],
    },
    username: {
      type: String,
      required: [true, 'An Username is required'],
      unique: [true, 'Username is not unique'],
    },
    password: {
      type: String,
      required: [true, 'A Password is required'],
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = models.User || model('User', UserSchema);

export default User;
