import React from "react";
import { getAllProjects } from "../prisma-db";
import Image from "next/image";
import { ProjectInfo } from "../classes/ProjectInfo";

export default async function MyWork() {
  const projects = await getAllProjects();
  
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        My Work
      </h2>
      <div className="space-y-8">
        {projects.map((projectData, index) => {
          // Convert Prisma data to ProjectInfo instance
          const project = ProjectInfo.fromJSON(projectData);
          
          return (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={1000}
                height={1000}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologiesUsed.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Role:</h4>
                  <p className="text-gray-600">{project.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 