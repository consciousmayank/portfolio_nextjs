import React from 'react';
import { Code2, Smartphone, Server } from 'lucide-react';

export default function AboutMe() {
  return (
    <div className="md:flex md:items-center md:justify-center min-h-[calc(100vh-12rem)]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-16">
          Hi, I&apos;m Mayank
        </h1>
        <p className="text-lg text-gray-600 mb-32">
          I&apos;m a seasoned developer with a proven track record of successfully delivering high-quality mobile and Web applications using Flutter. My web development skills are not only limited to Flutter, I can leverage technologies like ReactJS to create engaging user interfaces. I&apos;m also proficient in designing and building robust APIs with FastAPI, leading teams in implementing these technologies for optimized solutions. Let&apos;s collaborate to bring your vision to life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <Code2 className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
            <p className="text-gray-600">
              Have knowledge of ReactJS, NextJS, TailwindCSS, and Typescript.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <Server className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
            <p className="text-gray-600">
              Have knowledge of FastAPI, NodeJS, and MongoDB.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <Smartphone className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Mobile Development</h3>
            <p className="text-gray-600">
              Have knowledge of Flutter, Firebase, and Stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
