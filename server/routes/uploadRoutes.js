import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = path.join(__dirname, '../../public/assets/images');
    
    // Determine subdirectory based on file type
    if (file.mimetype.startsWith('video/')) {
      uploadPath = path.join(__dirname, '../../public/assets/videos');
    } else {
      // Determine image subdirectory based on request
      if (req.query.type === 'blog') {
        uploadPath = path.join(uploadPath, 'blog');
      } else if (req.query.type === 'avatar') {
        uploadPath = path.join(uploadPath, 'avatars');
      } else if (req.query.type === 'threat') {
        uploadPath = path.join(uploadPath, 'threats');
      }
    }
    
    // Ensure directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

// File filter for images and videos
const fileFilter = (req, file, cb) => {
  // Allow image types
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  // Allow video types
  const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
  
  // Combined allowed types
  const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

// Initialize upload middleware
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit for videos
  }
});

// Route to upload image or video
router.post('/', protect, upload.single('media'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Determine the URL path based on file type
    let url;
    if (req.file.mimetype.startsWith('video/')) {
      url = `/assets/videos/${req.file.filename}`;
    } else {
      const subdir = req.query.type || 'blog';
      url = `/assets/images/${subdir}/${req.file.filename}`;
    }
    
    res.json({ 
      mediaUrl: url,
      mediaType: req.file.mimetype.startsWith('video/') ? 'video' : 'image',
      fileName: req.file.filename,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

// Admin route to delete media
router.delete('/:filename', protect, admin, (req, res) => {
  try {
    const { filename } = req.params;
    const { type } = req.query;
    const isVideo = req.query.mediaType === 'video';
    
    // Ensure the filename doesn't contain path traversal
    if (filename.includes('..') || filename.includes('/')) {
      return res.status(400).json({ message: 'Invalid filename' });
    }
    
    let filePath;
    if (isVideo) {
      filePath = path.join(__dirname, '../../public/assets/videos', filename);
    } else {
      const subdir = type || 'blog';
      filePath = path.join(__dirname, `../../public/assets/images/${subdir}/${filename}`);
    }
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'File deleted successfully' });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting file' });
  }
});

// Routes to get gallery media - needs to be before param routes to avoid conflicts
router.get('/gallery/photos', async (req, res) => {
  try {
    const photosDir = path.join(__dirname, '../../public/assets/images/blog');
    
    // Check if directory exists
    if (!fs.existsSync(photosDir)) {
      return res.json([]);
    }
    
    const files = await fs.promises.readdir(photosDir);
    const photos = files
      .filter(file => ['.jpg', '.jpeg', '.png', '.gif', '.webp'].some(ext => file.toLowerCase().endsWith(ext)))
      .map(file => ({
        id: file,
        url: `/assets/images/blog/${file}`,
        mediaType: 'image',
        createdAt: new Date().toISOString()
      }));
    
    res.json(photos);
  } catch (error) {
    console.error('Error getting photos:', error);
    res.status(500).json({ message: 'Error retrieving photos' });
  }
});

router.get('/gallery/videos', async (req, res) => {
  try {
    const videosDir = path.join(__dirname, '../../public/assets/videos');
    
    // Check if directory exists
    if (!fs.existsSync(videosDir)) {
      return res.json([]);
    }
    
    const files = await fs.promises.readdir(videosDir);
    const videos = files
      .filter(file => ['.mp4', '.webm', '.ogg', '.mov'].some(ext => file.toLowerCase().endsWith(ext)))
      .map(file => ({
        id: file,
        url: `/assets/videos/${file}`,
        mediaType: 'video',
        createdAt: new Date().toISOString()
      }));
    
    res.json(videos);
  } catch (error) {
    console.error('Error getting videos:', error);
    res.status(500).json({ message: 'Error retrieving videos' });
  }
});

export default router;
