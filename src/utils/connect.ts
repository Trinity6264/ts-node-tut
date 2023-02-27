import mongoose from "mongoose";

export const connectDB = async (url: string): Promise<void> => {
    return mongoose.connect(url, {
        keepAlive: true,
        connectTimeoutMS: 90000,
    }).then(() => {
        console.table('Connected to database');
    }).catch((e) => {
        console.log('Could not connect to database');
        process.exit(1);
    });
}