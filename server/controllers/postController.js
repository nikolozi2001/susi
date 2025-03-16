import Post from '../models/Post.js';

// Sample data for when the database is empty
const samplePosts = [
  {
    title: "Getting Started with React",
    slug: "getting-started-with-react",
    excerpt: "React is a popular JavaScript library for building user interfaces. This post will guide you through the basics of React.",
    content: `
      # Getting Started with React

      React is a JavaScript library for building user interfaces. It's maintained by Facebook and a community of individual developers and companies.

      ## Why React?

      - Component-Based: Build encapsulated components that manage their own state, then compose them to make complex UIs.
      - Declarative: React makes it painless to create interactive UIs. Design simple views for each state in your application.
      - Learn Once, Write Anywhere: You can develop new features in React without rewriting existing code.

      ## Setting Up Your First React App

      The easiest way to start with React is to use Create React App. It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production.
    `,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    published: true
  },
  {
    title: "Tailwind CSS Tips and Tricks",
    slug: "tailwind-css-tips-and-tricks",
    excerpt: "Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML.",
    content: `
      # Tailwind CSS Tips and Tricks

      Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center, and rotate-90 that can be composed to build any design, directly in your markup.

      ## Why Tailwind?

      - Rapid UI development
      - Consistent design system
      - Mobile-first approach
      - Customizable
    `,
    image: "https://images.unsplash.com/photo-1545670723-196ed0954986?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1952&q=80",
    published: true
  }
];

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
export const getPosts = async (req, res) => {
  try {
    const { published, search } = req.query;
    
    // Build query
    let query = {};
    
    // Filter by published status
    if (published) {
      query.published = published === 'true';
    }
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query
    let posts = await Post.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    
    // If no posts found, check if collection is empty
    if (posts.length === 0) {
      const count = await Post.countDocuments();
      if (count === 0) {
        // Return sample data if database is empty
        console.log('No posts found in database. Returning sample data.');
        return res.json(samplePosts);
      }
    }
    
    res.json(posts);
  } catch (error) {
    console.error('Error in getPosts:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single post by ID
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'name');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get post by slug
// @route   GET /api/posts/slug/:slug
// @access  Public
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug })
      .populate('author', 'name');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private/Admin
export const createPost = async (req, res) => {
  try {
    const newPost = {
      ...req.body,
      author: req.user.id
    };
    
    const post = await Post.create(newPost);
    
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private/Admin
export const updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Update fields
    Object.keys(req.body).forEach(key => {
      post[key] = req.body[key];
    });
    post.updatedAt = Date.now();
    
    // Save the updated post
    await post.save();
    
    res.json(post);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    await post.deleteOne();
    
    res.json({ message: 'Post removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};
