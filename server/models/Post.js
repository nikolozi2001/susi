import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Post excerpt is required']
  },
  content: {
    type: String,
    required: [true, 'Post content is required']
  },
  image: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create text index for search functionality
postSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

const Post = mongoose.model('Post', postSchema);

export default Post;
