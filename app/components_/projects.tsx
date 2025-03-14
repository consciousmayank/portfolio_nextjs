"use server";
// import { Link } from "lucide-react";
import Link from "next/link";
import { getAllProjects } from "../prisma-db";

export default async function Projects() {
  const projects = await getAllProjects();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Project Cards would go here */}
        {projects.map((project, index) => (
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

              {project.technologiesUsed &&
                Array.isArray(project.technologiesUsed) && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Technology:
                    </h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {project.technologiesUsed.map((tech) => (
                        <span
                          key={String(tech)}
                          className="px-6 py-1 bg-blue-100 text-blue-600 rounded-full text-sm mr-2 mb-2 inline-block pl-4 pr-4"
                        >
                          {String(tech)}
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              {/* <p className="mt-2 text-gray-600 dark:text-gray-300">
                {project.links && Array.isArray(project.links)
                  ? project.links.join(", ")
                  : ""}
              </p> */}


              {project.links &&
                Array.isArray(project.links) && (
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                      Links:
                    </h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {project.links.map((tech) => (
                        <span
                          key={String(tech)}
                          className="px-3 py-1 bg-green-100 text-black rounded-full text-sm mr-2 mb-2 inline-block pl-4 pr-4"
                        >
                          <Link className="w-4 h-4" href={String(tech)} target="_blank">
                            {String(tech)}
                          </Link>
                        </span>
                      ))}
                    </p>
                  </div>
                )}


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/*

<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Project 1
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Description of project 1
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Project 2
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Description of project 2
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            Project 3
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Description of project 3
          </p>
        </div>

*/
