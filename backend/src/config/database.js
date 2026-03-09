import mongoose from "mongoose";

const connectDB = async () => {
  // Setup connection event listeners to monitor the connection status
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection encountered an error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Mongoose will automatically attempt to reconnect.');
  });

  // Function to connect with a retry mechanism if the initial connection fails
  const connectWithRetry = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      console.error("❌ CRITICAL: MONGODB_URI is not defined in environment variables!");
      return;
    }

    console.log(`📡 Attempting to connect to MongoDB... (Target: ${uri.substring(0, 20)}...)`);

    try {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000, // Increased to 10 seconds for Cloud DBs
      });
    } catch (error) {
      console.error("❌ MongoDB initial connection failed:", error.message);
      console.log("🔁 Retrying MongoDB connection in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    }
  };

  await connectWithRetry();
};

export default connectDB; 
