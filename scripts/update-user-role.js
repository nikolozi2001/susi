import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Setup proper path for .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../server/.env') });

import User from '../server/models/User.js';

// Connect to MongoDB
const connectDB = async () => {
  try {
    const clientOptions = { 
      serverApi: { version: '1', strict: true, deprecationErrors: true } 
    };
    
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Update a user's role by email
const updateUserRole = async (email, newRole) => {
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      console.error(`User with email ${email} not found`);
      return false;
    }
    
    user.role = newRole;
    await user.save();
    
    console.log(`User ${email} role updated to ${newRole}`);
    return true;
  } catch (error) {
    console.error('Error updating user role:', error);
    return false;
  }
};

// Main function
const main = async () => {
  if (process.argv.length < 4) {
    console.log('Usage: node update-user-role.js <email> <role>');
    console.log('Example: node update-user-role.js user@example.com admin');
    process.exit(1);
  }
  
  const email = process.argv[2];
  const role = process.argv[3];
  
  // Validate role
  if (!['user', 'admin'].includes(role)) {
    console.error('Invalid role. Role must be either "user" or "admin"');
    process.exit(1);
  }
  
  try {
    await connectDB();
    const success = await updateUserRole(email, role);
    
    if (success) {
      console.log('Role updated successfully');
    } else {
      console.log('Failed to update role');
    }
  } catch (error) {
    console.error('Operation failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
};

// Run the script
main();
