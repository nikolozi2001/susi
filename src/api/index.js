import axios from 'axios';
import { posts as localPosts } from '../data/posts';

// Default to port 5001 since 5000 is often busy
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

console.log('Using API URL:', API_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000
});

// Request interceptor
api.interceptors.request.use(
  config => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    // Log error details
    if (error.response) {
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Request error (no response):', error.message);
    } else {
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Helper function to get fallback post data
const getFallbackPosts = () => {
  console.log('Using fallback local posts data');
  return localPosts;
};

// Test API connection
export const testConnection = async () => {
  try {
    const response = await api.get('/test', { timeout: 5000 });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Connection test failed:', error.message);
    // Dispatch an event that the OfflineNotice component can listen for
    window.dispatchEvent(new CustomEvent('api-error', { detail: error }));
    return { success: false, error: error.message };
  }
};

// Auth API functions
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const register = async (name, email, password, role = 'user') => {
  const response = await api.post('/auth/register', { name, email, password, role });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

// Posts API functions with fallbacks
export const getPosts = async ({ published, limit, page, search, useLocal = false }) => {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    if (published !== undefined) params.append('published', published.toString());
    if (limit) params.append('limit', limit.toString());
    if (page) params.append('page', page.toString());
    if (search) params.append('search', search);
    
    // Only use local storage as fallback if not explicitly disabled
    if (!useLocal) {
      // Use the API instance instead of axios directly
      const response = await api.get(`/posts?${params.toString()}`);
      console.log('API response:', response.data);
      
      // Check if we got a proper response with posts array
      if (response.data && (response.data.posts || Array.isArray(response.data))) {
        // Handle both {posts: [...]} and direct array response formats
        return Array.isArray(response.data) ? response.data : response.data.posts;
      }
    }
    
    // Fallback to local storage only if API fails or useLocal is true
    console.log('Falling back to local data for posts');
    const storedPosts = localStorage.getItem('posts');
    const localPosts = storedPosts ? JSON.parse(storedPosts) : [];
    
    // Apply search filter locally
    if (search) {
      const searchLower = search.toLowerCase();
      return localPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        (post.content && post.content.toLowerCase().includes(searchLower)) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchLower))
      );
    }
    
    return localPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Fallback to localStorage
    const storedPosts = localStorage.getItem('posts');
    const localPosts = storedPosts ? JSON.parse(storedPosts) : [];
    
    // Apply search filter locally
    if (search) {
      const searchLower = search.toLowerCase();
      return localPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) ||
        (post.content && post.content.toLowerCase().includes(searchLower)) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchLower))
      );
    }
    
    return localPosts;
  }
};

export const getPostBySlug = async (slug) => {
  try {
    const response = await api.get(`/posts/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post by slug:', error.message);
    // Dispatch event for connection errors
    if (error.message.includes('timeout') || error.message.includes('Network Error')) {
      window.dispatchEvent(new CustomEvent('api-error', { detail: error }));
    }
    return localPosts.find(p => p.slug === slug);
  }
};

export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post by id:', error.message);
    // Dispatch event for connection errors
    if (error.message.includes('timeout') || error.message.includes('Network Error')) {
      window.dispatchEvent(new CustomEvent('api-error', { detail: error }));
    }
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts', postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error.message);
    // Dispatch event for connection errors
    if (error.message.includes('timeout') || error.message.includes('Network Error')) {
      window.dispatchEvent(new CustomEvent('api-error', { detail: error }));
    }
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error.message);
    // Dispatch event for connection errors
    if (error.message.includes('timeout') || error.message.includes('Network Error')) {
      window.dispatchEvent(new CustomEvent('api-error', { detail: error }));
    }
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post:', error.message);
    // Dispatch event for connection errors
    if (error.message.includes('timeout') || error.message.includes('Network Error')) {
      window.dispatchEvent(new CustomEvent('api-error', { detail: error }));
    }
    throw error;
  }
};

export default api;
