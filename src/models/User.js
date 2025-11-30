import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
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

const User = models.User || model('User', UserSchema);

export default User;
