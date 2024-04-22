import { EventEmitterAsyncResource } from 'events';
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://gabrielapazae:lsLDxgbcSc9YmFPG@authvetbond.ocwwkbd.mongodb.net/vetbond')
    console.log(">>> DB is connected")
  } catch (error) {
  }
};
