"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
    general?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    username: false,
    password: false
  });
  const router = useRouter();

  // Validate a specific field
  const validateField = (field: 'username' | 'password', value: string) => {
    if (field === 'username') {
      if (!value.trim()) {
        return 'Username is required';
      }
      if (value.length < 3) {
        return 'Username must be at least 3 characters';
      }
    }
    if (field === 'password') {
      if (!value) {
        return 'Password is required';
      }
      if (value.length < 6) {
        return 'Password must be at least 6 characters';
      }
    }
    return '';
  };

  // Handle field blur events
  const handleBlur = (field: 'username' | 'password') => {
    setTouched({
      ...touched,
      [field]: true
    });
    
    const error = validateField(field, field === 'username' ? username : password);
    if (error) {
      setErrors({
        ...errors,
        [field]: error
      });
    } else {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  // Handle field change events
  const handleChange = (field: 'username' | 'password', value: string) => {
    if (field === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
    
    // If the field has been touched, validate it on change
    if (touched[field]) {
      const error = validateField(field, value);
      if (error) {
        setErrors({
          ...errors,
          [field]: error
        });
      } else {
        const newErrors = { ...errors };
        delete newErrors[field];
        setErrors(newErrors);
      }
    }
  };

  // Validate all fields before submission
  const validateForm = () => {
    const newErrors: {
      username?: string;
      password?: string;
      general?: string;
    } = {};
    
    const usernameError = validateField('username', username);
    const passwordError = validateField('password', password);
    
    if (usernameError) {
      newErrors.username = usernameError;
    }
    
    if (passwordError) {
      newErrors.password = passwordError;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      username: true,
      password: true
    });
    
    // Validate the form
    if (!validateForm()) {
      return;
    }
    
    setErrors({});
    setLoading(true);

    // Here you would typically call your authentication API
    try {
      // Simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, let's add a simple validation
      if (username === 'mayank' && password === 'NTZ/7a3!%UEn') {
        // Successful login redirects to backend page
        router.push('/backend/projects');
      } else {
        setErrors({
          general: 'Invalid username or password'
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        general: 'An error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine input field classes based on validation
  const getInputClasses = (field: 'username' | 'password') => {
    const baseClasses = "appearance-none relative block w-full px-3 py-4 bg-transparent focus:outline-none focus:ring-blue-500 focus:z-10 sm:text-sm";
    const validClasses = "border-gray-300 dark:border-gray-700 placeholder-gray-500 text-gray-800 dark:text-white focus:border-blue-500";
    const errorClasses = "border-red-300 dark:border-red-700 placeholder-red-300 dark:placeholder-red-500 text-red-600 dark:text-red-400 focus:border-red-500";
    
    return `${baseClasses} ${errors[field] && touched[field] ? errorClasses : validClasses} ${field === 'username' ? 'border-b' : ''}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-800 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
            Or{' '}
            <Link
              href="/"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              return to homepage
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm bg-white dark:bg-gray-800 overflow-hidden">
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 px-3 pt-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => handleChange('username', e.target.value)}
                onBlur={() => handleBlur('username')}
                className={getInputClasses('username')}
                placeholder="Enter your username"
              />
              {errors.username && touched.username && (
                <p className="text-red-500 text-xs px-3 py-1">{errors.username}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 px-3 pt-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => handleChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                className={getInputClasses('password')}
                placeholder="Enter your password"
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-xs px-3 py-1">{errors.password}</p>
              )}
            </div>
          </div>

          {/* General error message */}
          {errors.general && (
            <div className="text-red-500 text-center text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded-md">
              {errors.general}
            </div>
          )}

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
