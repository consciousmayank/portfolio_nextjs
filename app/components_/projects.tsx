"use server";
import Link from "next/link";
import { getAllProjects } from "../prisma-db";

// Helper function to safely parse JSON values
const parseJsonArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

export default async function Projects() {
  const projects = await getAllProjects();
  console.log(projects);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Project Cards would go here */}
        {projects.map((project, index) => {
          // Safely parse JSON values into arrays
          const technologiesUsed = parseJsonArray(project.technologiesUsed);
          const links = parseJsonArray(project.links).filter(link => link && String(link).trim() !== "");

          return (
            <div
              key={index}
              // className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center">
                  Project {index + 1}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {project.title}
                </p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Role:
                  </h4>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {project.role}
                  </p>
                </div>

                {technologiesUsed.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Technology:
                    </h4>
                    <div className="mt-2 text-gray-600 dark:text-gray-300">
                      {technologiesUsed.map((tech) => {
                        const techStr = String(tech).trim();
                        if (!techStr) return null;
                        
                        return (
                          <span
                            key={techStr}
                            className="px-6 py-1 bg-blue-100 text-blue-600 rounded-full text-sm mr-2 mb-2 inline-block pl-4 pr-4"
                          >
                            {techStr}
                        </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {links.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Links:
                    </h4>
                    <div className="mt-2 text-gray-600 dark:text-gray-300">
                      {links.map((link) => {
                        const linkStr = String(link).trim();
                        if (!linkStr) return null;
                        
                        return (
                          <span
                            key={linkStr}
                            className="px-3 py-1 bg-green-100 text-black rounded-full text-sm mr-2 mb-2 inline-block pl-4 pr-4"
                          >
                            <Link href={linkStr} target="_blank" rel="noopener noreferrer">
                              <div className="relative group">
                                <p className="text-xs max-w-[100px] truncate">{linkStr}</p>
                                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  {linkStr}
                                </span>
                              </div>
                            </Link>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

