import express from 'express';
import { 
  registerUser, 
  loginUser, 
  getCurrentUser, 
  updateUserRole,
  getUsers
} from '../controllers/authController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getCurrentUser);

// Admin routes
router.get('/users', protect, admin, getUsers);
router.put('/users/:id/role', protect, admin, updateUserRole);

export default router;
