import { Document, Model, Schema, model, models } from 'mongoose';

export interface IUser extends Document {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  emailVerified: boolean;
  verificationToken: string | null;
  verificationTokenExpires: Date | null;
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
      maxlength: 20,
      match: [
        /^[a-zA-Z0-9_-]+$/,
        'Username can only contain letters, numbers, underscores and hyphens',
      ],
    },
    firstname: {
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
    lastname: {
      type: String,
      required: false,
      trim: true,
      maxlength: 20,
      match: [
        /^[\p{L}' -]+$/u,
        'The second name can only contain letters, spaces, apostrophes and hyphens',
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// select false password: avoid selecting password auto when selecting user
// emailV and verifications for verification process.

const User: Model<IUser> = models.User || model('User', UserSchema);

export default User;
