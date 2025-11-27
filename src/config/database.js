import mongoose from 'mongoose';

let connected = false;

const connectDB = async () => {
  // only fields specified in schema would be saved
  mongoose.set('strictQuery', true);

  // Check to avoid repetitive connection
  if (connected) {
    console.log('MongoDb is already connected!');
    return;
  }

  // Connect to db
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
