import { Document, Model, Schema, model, models } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: [true, 'An username is required'],
      unique: [true, 'Username is not unique'],
      trim: true,
      minLength: 3,
      maxlength: 10,
      match: [
        /^[a-zA-Z0-9_-]+$/,
        'Username can only contain letters, numbers, underscores and hyphens',
      ],
    },
    email: {
      type: String,
      required: [true, 'An email is required'],
      unique: [true, 'Email is not unique.'],
      trim: true,
      lowercase: true,
      maxlength: 50,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<IUser> = models.User || model('User', UserSchema);

export default User;
