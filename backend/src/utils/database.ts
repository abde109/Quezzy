import mongoose from 'mongoose';
import { logger } from './logger';

const connectionParams = {};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', connectionParams);
    logger.info('MongoDB connected');
  } catch (error:any) {
    console.log(error);
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};


export default connectDB;