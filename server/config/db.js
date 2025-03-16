import mongoose from 'mongoose';

const clientOptions = { 
  serverApi: { 
    version: '1', 
    strict: true, 
    deprecationErrors: true 
  } 
};

const connectDB = async () => {
  try {
    // Connect to MongoDB Atlas with the stable API version
    const conn = await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    
    // Verify connection with a ping
    await mongoose.connection.db.admin().command({ ping: 1 });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log("Pinged your deployment. You successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
