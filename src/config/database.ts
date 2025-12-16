import mongoose from 'mongoose';

let connected = false;

const connectDB = async (): Promise<void> => {
  // only fields specified in schema would be saved
  mongoose.set('strictQuery', true);

  // Check to avoid repetitive connection
  if (connected) {
    console.log('MongoDb is already connected!');
    return;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  // Connect to db
  try {
    await mongoose.connect(mongoUri);
    connected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
