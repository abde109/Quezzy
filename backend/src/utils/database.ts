import mongoose from 'mongoose';
import { logger } from './logger';

const connectionParams = {};

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', connectionParams);
    logger.info('MongoDB connected');
  } catch (error:any) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
