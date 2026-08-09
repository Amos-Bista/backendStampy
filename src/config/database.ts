import mongoose from "mongoose";

let isConnected = false;

export async function connectDatabase() {
    if (isConnected) {
        return;
    }

    await mongoose.connect(process.env.MONGO_URI!);

    isConnected = true;

    console.log("MongoDB Connected Successfully");
}