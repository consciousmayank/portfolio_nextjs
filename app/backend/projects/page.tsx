"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProjectInfo } from "../../classes/ProjectInfo";
import { PROJECT_API_URL } from "@/app/api/api_constants";
import { NextResponse } from "next/server";

export default function ProjectsManagement() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // For edit/create form
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentProject, setCurrentProject] = useState<ProjectInfo | null>(
    null
  );
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    description: "",
    role: "",
    links: [""],
    technologiesUsed: [""],
    image: "",
  });

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('api/v1/projects');
      if (!response.ok) {
        throw new Error("Failed to fetch projects in projects page");
      }
      const data = (await response.json()) as Record<string, unknown>[];
      const projectsList = data.map((item) => ProjectInfo.fromJSON(item));
      setProjects(projectsList);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError(
        "Database connection failed " + 'api/v1/projects',
      );
      const errorMessage =
        err instanceof Error ? err.message : "Unknown database error";
      return NextResponse.json(
        {
          error: "Database connection failed " + 'api/v1/projects',
          message: errorMessage,
        },
        { status: 500 }
      );
    } finally {
      setLoading(false);
    }
  };

  // Load projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle array input changes (links, technologies)
  const handleArrayInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "links" | "technologiesUsed",
    index: number
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  // Add new item to an array field
  const addArrayItem = (field: "links" | "technologiesUsed") => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  // Remove item from an array field
  const removeArrayItem = (
    field: "links" | "technologiesUsed",
    index: number
  ) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  // Start editing a project
  const startEditing = (project: ProjectInfo) => {
    setCurrentProject(project);
    setFormData({
      id: project.id,
      title: project.title,
      description: project.description,
      role: project.role,
      links: [...project.links],
      technologiesUsed: [...project.technologiesUsed],
      image: project.image,
    });
    setIsEditing(true);
    setIsCreating(false);
  };

  // Start creating a new project
  const startCreating = () => {
    setCurrentProject(null);
    setFormData({
      id: 0, // Will be assigned by the database
      title: "",
      description: "",
      role: "",
      links: [""],
      technologiesUsed: [""],
      image: "",
    });
    setIsCreating(true);
    setIsEditing(false);
  };

  // Cancel editing/creating
  const cancelForm = () => {
    setIsEditing(false);
    setIsCreating(false);
    setCurrentProject(null);
  };

  // Submit the form (create or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Make sure technologiesUsed and links are properly formatted
      const dataToSubmit = {
        ...formData,
        // Ensure these are arrays, not objects or malformed data
        technologiesUsed: Array.isArray(formData.technologiesUsed)
          ? formData.technologiesUsed.filter(Boolean)
          : [],
        links: Array.isArray(formData.links)
          ? formData.links.filter(Boolean)
          : [],
      };

      console.log("Submitting data:", dataToSubmit);

      let response;

      if (isCreating) {
        // Create new project
        response = await fetch('api/v1/projects', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        });
      } else if (isEditing && currentProject) {
        // Update existing project
        response = await fetch(PROJECT_API_URL(dataToSubmit.id), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        });
      }

      if (!response) {
        throw new Error("No response from server");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Server response:", response.status, errorData);
        throw new Error(errorData?.error || `Server error: ${response.status}`);
      }

      // Refresh the project list
      await fetchProjects();

      // Reset form state
      cancelForm();
    } catch (err) {
      console.error("Error saving project:", err);
      setError(
        `Failed to save project: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }
  };

  // Delete a project
  const deleteProject = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const response = await fetch(PROJECT_API_URL(id), {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      // Refresh the project list
      await fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Projects Management</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push("/backend")}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-300"
            >
              Back to Dashboard
            </button>
            {!isCreating && !isEditing && (
              <button
                onClick={startCreating}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-300"
              >
                Add New Project
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md mb-6">
            {error}
            <button
              className="ml-2 text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-100"
              onClick={() => setError(null)}
            >
              ×
            </button>
          </div>
        )}

        {/* Project Form (Edit/Create) */}
        {(isEditing || isCreating) && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {isCreating ? "Create New Project" : "Edit Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  required
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>

              {/* Technologies Used */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Technologies Used
                </label>
                {formData.technologiesUsed.map((tech, index) => (
                  <div key={`tech-${index}`} className="flex mb-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) =>
                        handleArrayInputChange(e, "technologiesUsed", index)
                      }
                      className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      placeholder="e.g., React, Next.js, Tailwind"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("technologiesUsed", index)}
                      className="ml-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                      disabled={formData.technologiesUsed.length <= 1}
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("technologiesUsed")}
                  className="mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                >
                  Add Technology
                </button>
              </div>

              {/* Links */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Links
                </label>
                {formData.links.map((link, index) => (
                  <div key={`link-${index}`} className="flex mb-2">
                    <input
                      type="url"
                      value={link}
                      onChange={(e) =>
                        handleArrayInputChange(e, "links", index)
                      }
                      className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                      placeholder="https://example.com"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem("links", index)}
                      className="ml-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                      disabled={formData.links.length <= 1}
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem("links")}
                  className="mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
                >
                  Add Link
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
                >
                  {isCreating ? "Create Project" : "Update Project"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Projects List */}
        {!isEditing && !isCreating && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Technologies
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      Loading projects...
                    </td>
                  </tr>
                ) : projects.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                    >
                      No projects found. Add your first project!
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {project.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {project.role}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-1">
                          {project.technologiesUsed.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => startEditing(project)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
