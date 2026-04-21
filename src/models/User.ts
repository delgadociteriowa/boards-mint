import { Document, Model, Schema, model, models } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'An email is required'],
      unique: [true, 'Email is not unique.'],
      trim: true,
      lowercase: true,
      maxlength: 50,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
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
    firstName: {
      type: String,
      required: [true, 'A first name is required'],
      trim: true,
      minLength: 2,
      maxlength: 20,
      match: [
        /^[\p{L}' -]+$/u,
        'The first name can only contain letters, spaces, apostrophes and hyphens',
      ],
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
      minLength: 2,
      maxlength: 20,
      match: [
        /^[\p{L}' -]+$/u,
        'The second name can only contain letters, spaces, apostrophes and hyphens',
      ],
    },
    password: {
      type: String,
      required: false,
      select: false,
      trim: true,
      minLength: 8,
      maxlength: 50,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,50}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ],
    },
  },
  {
    timestamps: true,
  },
);

// colocar select false en password para que al seleccionar un usuario no se tome su password automaticamente.

const User: Model<IUser> = models.User || model('User', UserSchema);

export default User;
