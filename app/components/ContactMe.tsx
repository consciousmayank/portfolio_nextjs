"use client";
import React, { useState } from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';

export default function ContactMe() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h4 className="text-3xl font-bold text-gray-100 mb-8 text-center">Get In Touch</h4>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="dark:bg-gray-900 rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6">Contact Me</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-100 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-100 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-100 mb-1">
                Reason for Contact
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
        
        <div className="dark:bg-gray-900 rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-semibold mb-6">Connect With Me</h3>
          <div className="space-y-6">
            <a
              href="https://www.linkedin.com/in/mayank-joshi-2797b773/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-100 hover:text-blue-600 transition-colors duration-200"
            >
              <Linkedin className="w-6 h-6 mr-3" />
              <span>LinkedIn Profile</span>
            </a>
            
            <a
              href="https://github.com/consciousmayank"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-100 hover:text-amber-900 transition-colors duration-200"
            >
              <Github className="w-6 h-6 mr-3" />
              <span>GitHub Profile</span>
            </a>
            
            <a
              href="mailto:consciousmayank@gmail.com"
              className="flex items-center text-gray-100 hover:text-green-600 transition-colors duration-200"
            >
              <Mail className="w-6 h-6 mr-3" />
              <span>Email Me</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
