import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    
    // ❌ REMOVE THIS
    // process.exit(1);

    // ✅ ADD THIS
    console.log("Server will continue running without DB");
  }
};

export default connectDB;