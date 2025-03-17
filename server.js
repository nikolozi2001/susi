import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import connectDB from './server/config/db.js';
import authRoutes from './server/routes/authRoutes.js';
import postRoutes from './server/routes/postRoutes.js';
import uploadRoutes from './server/routes/uploadRoutes.js';

// Load environment variables
dotenv.config({ path: './server/.env' });

// Create express app
const app = express();

// Use a very permissive CORS setup for development
app.use(cors({
  origin: '*',
  methods: '*',
  allowedHeaders: '*'
}));

// Handle preflight requests specifically
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.sendStatus(200);
});

// Connect to MongoDB
try {
  connectDB();
  console.log('MongoDB connection initialized');
} catch (error) {
  console.error('MongoDB connection failed:', error.message);
}

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// More detailed request logging for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API is working!' });
});

// List all registered routes for debugging
const listRoutes = () => {
  console.log('Registered API Routes:');
  app._router.stack
    .filter(r => r.route)
    .forEach(r => {
      const methods = Object.keys(r.route.methods).join(',');
      console.log(`${methods.toUpperCase()} ${r.route.path}`);
    });
  
  // Log Express router stack - shows middleware registrations
  console.log('Express Router Stack:');
  app._router.stack
    .filter(r => r.name === 'router')
    .forEach(r => {
      console.log(`Router: ${r.regexp}`);
    });
};

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/uploads', uploadRoutes);

// Run the route listing function after routes are registered
if (process.env.NODE_ENV !== 'production') {
  listRoutes();
}

// Handle uploads directory for images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create directories if they don't exist
const uploadsDir = path.join(__dirname, '/uploads');
const assetsDir = path.join(__dirname, '/public/assets');
const imagesDir = path.join(assetsDir, '/images');
const videosDir = path.join(assetsDir, '/videos');
const blogImagesDir = path.join(imagesDir, '/blog');
const avatarsDir = path.join(imagesDir, '/avatars');
const threatsDir = path.join(imagesDir, '/threats');
const uiImagesDir = path.join(imagesDir, '/ui');

// Create directories if they don't exist
[uploadsDir, assetsDir, imagesDir, videosDir, blogImagesDir, avatarsDir, threatsDir, uiImagesDir]
  .forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });

// Serve static files
app.use('/uploads', express.static(uploadsDir));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));
app.use(express.static(path.join(__dirname, 'public')));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  console.error(err.stack);
  res.status(500).json({
    message: err.message || 'Something went wrong on the server'
  });
});

// Start server with alternative port if the primary port is busy
const primaryPort = process.env.PORT || 5000;
const backupPort = 5001;

// Function to start the server
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`API available at http://localhost:${port}/api`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE' && port === primaryPort) {
      console.log(`Port ${primaryPort} is busy, trying ${backupPort} instead...`);
      startServer(backupPort);
    } else {
      console.error('Server error:', err);
    }
  });
};

// Try to start the server on the primary port
startServer(primaryPort);
