"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Backend() {
  const router = useRouter();
  
  // Handle back button navigation
  useEffect(() => {
    // Update browser history to prevent going back to login
    window.history.pushState(null, '', '/backend');
    
    const handlePopState = () => {
      // When back button is pressed, redirect to homepage
      router.push('/');
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Backend Dashboard</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <p className="mb-4">Welcome to the admin backend.</p>
          <p className="mb-6">This is a protected area that should only be accessible after login.</p>
          
          <div className="flex space-x-4">
            <Link 
              href="/" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
            >
              Return to Homepage
            </Link>
            
            <button 
              onClick={() => router.push('/login')}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Projects Management</h2>
          <p className="mb-4">Manage the details about the projects listed on the website.</p>
          <div className="flex justify-end">
            <button 
              onClick={() => router.push('/backend/projects')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
            >
              Manage Projects
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}