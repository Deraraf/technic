import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    // Check the current connection state
    const connectionState = mongoose.connection.readyState;

    switch (connectionState) {
      case 1: // Connected
        console.log("Already connected to MongoDB");
        return;

      case 2: // Connecting
        console.log("Connection to MongoDB is already in progress...");
        return;

      default: // Not connected or disconnected (states 0 or 3)
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};

export default connectDB;
