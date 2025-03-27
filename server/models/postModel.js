import mongoose from 'mongoose';
import slugify from 'slugify';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      maxlength: [200, 'Post title cannot be more than 200 characters']
    },
    slug: {
      type: String,
      unique: true,
      index: true
    },
    excerpt: {
      type: String,
      required: [true, 'Post excerpt is required'],
      maxlength: [1000, 'Excerpt cannot be more than 1000 characters']
    },
    content: {
      type: String,
      required: [true, 'Post content is required']
    },
    image: {
      type: String,
      default: ''
    },
    published: {
      type: Boolean,
      default: false
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: [String],
    category: {
      type: String,
      default: 'uncategorized'
    },
    views: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Set up text index for search functionality
postSchema.index({ 
  title: 'text', 
  content: 'text', 
  excerpt: 'text',
  tags: 'text'
}, {
  weights: {
    title: 10,
    tags: 5,
    excerpt: 3,
    content: 1
  }
});

// Middleware to create a slug from the title before saving
postSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    // Create slug from title with timestamp to ensure uniqueness
    this.slug = slugify(this.title, { 
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    });
    
    // Add a timestamp to ensure uniqueness if this is a new post or slug is being modified
    if (this.isNew || this.isModified('slug')) {
      const timestamp = new Date().getTime().toString().slice(-6);
      this.slug = `${this.slug}-${timestamp}`;
    }
  }
  next();
});

// Virtual field for formatted date
postSchema.virtual('formattedDate').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

// Method to increase view count
postSchema.methods.increaseViews = async function() {
  this.views += 1;
  await this.save();
  return this;
};

// Static method to get related posts by tags
postSchema.statics.getRelatedPosts = async function(postId, tags, limit = 3) {
  return this.find({
    _id: { $ne: postId },
    tags: { $in: tags },
    published: true
  })
  .limit(limit)
  .select('title slug excerpt image createdAt')
  .sort({ createdAt: -1 });
};

const Post = mongoose.model('Post', postSchema);

export default Post;
