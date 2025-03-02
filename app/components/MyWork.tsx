import React from 'react';
import { Github, Globe, FileText } from 'lucide-react';

type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  role: string;
  demo?: string;
  github: string;
  caseStudy?: string;
};

const projects = [
  {
    title: "E-Commerce Mobile App",
    description: "A full-featured e-commerce mobile application with real-time inventory management, secure payment processing, and personalized user recommendations.",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=1024",
    technologies: ["Flutter", "Firebase", "Stripe"],
    role: "Lead Mobile Developer",
    demo: "https://example.com/demo",
    github: "https://github.com/example/project",
    caseStudy: "https://example.com/case-study"
  },
  {
    title: "Task Management Platform",
    description: "A collaborative task management platform with real-time updates, team chat, and advanced project analytics dashboard.",
    image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=1024",
    technologies: ["ReactJS", "Node.js", "MongoDB"],
    role: "Full Stack Developer",
    demo: "https://example.com/demo2",
    github: "https://github.com/example/project2"
  },
  {
    title: "Healthcare API System",
    description: "A HIPAA-compliant API system for managing patient records, appointments, and medical history with advanced security features.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1024",
    technologies: ["FastAPI", "PostgreSQL", "Docker"],
    role: "Backend Developer",
    github: "https://github.com/example/project3",
    caseStudy: "https://example.com/case-study3"
  }
];

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Role:</h4>
          <p className="text-gray-600">{project.role}</p>
        </div>
        
        <div className="flex gap-4">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" 
               className="flex items-center text-blue-600 hover:text-blue-700">
              <Globe className="w-4 h-4 mr-1" />
              Live Demo
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" 
             className="flex items-center text-gray-700 hover:text-gray-900">
            <Github className="w-4 h-4 mr-1" />
            GitHub
          </a>
          {project.caseStudy && (
            <a href={project.caseStudy} target="_blank" rel="noopener noreferrer" 
               className="flex items-center text-green-600 hover:text-green-700">
              <FileText className="w-4 h-4 mr-1" />
              Case Study
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default function MyWork() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">My Work</h2>
      <div className="space-y-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};
