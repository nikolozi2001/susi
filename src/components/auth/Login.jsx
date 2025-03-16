import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || '/';
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setError('');
      setLoading(true);
      await login(data.email, data.password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setError('Failed to sign in: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-susi-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-susi-black mb-6">Log In</h2>
      
      {error && (
        <div className="p-3 mb-4 text-red-500 bg-red-50 border border-red-300 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-susi-gray-600 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="password" className="block text-susi-gray-600 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-susi-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-susi-gray-500"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-susi-gray-700 text-susi-white rounded hover:bg-susi-darkgray transition-colors disabled:bg-susi-gray-400"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-susi-gray-600">
          Don't have an account? <Link to="/signup" className="text-susi-gray-700 hover:text-susi-black">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
