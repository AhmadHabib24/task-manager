import mongoose from "mongoose";
import ENV from "../../config.mjs";

const connectDB = async () => {
    try {
        await mongoose.connect(ENV.database, {
            serverSelectionTimeoutMS: 5000, 
        });
        console.log("MongoDB connected...");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); 
    }
};

export { connectDB, mongoose };