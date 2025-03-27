import express from 'express';
import { 
  getPosts, 
  getPostById, 
  getPostBySlug,
  createPost, 
  updatePost, 
  deletePost 
} from '../controllers/postController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// Define routes
router.route('/')
  .get(getPosts)
  .post(protect, admin, createPost);

router.route('/slug/:slug')
  .get(getPostBySlug);

router.route('/:id')
  .get(getPostById)
  .put(protect, admin, updatePost)
  .delete(protect, admin, deletePost);

export default router;
