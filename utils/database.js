import mongoose from 'mongoose';
import { TEMPORARY_REDIRECT_STATUS } from 'next/dist/shared/lib/constants';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected= true;
        console.log('mongDB connected');
    } catch (error) {
        console.log(error);
    }
}