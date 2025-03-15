"use client";

import { useState } from "react";
import { ProjectInfo } from "@/app/classes/ProjectInfo";
import ProjectForm from "./ProjectForm";

interface ProjectTableProps {
  projects: ProjectInfo[] | any[];
  updateAction: (formData: FormData) => Promise<void>;
  deleteAction: (formData: FormData) => Promise<void>;
}

export default function ProjectTable({ 
  projects, 
  updateAction, 
  deleteAction 
}: ProjectTableProps) {
  const [editingProject, setEditingProject] = useState<ProjectInfo | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  // Start editing a project
  const handleEdit = (project: ProjectInfo) => {
    setEditingProject(project);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProject(null);
  };

  // Prepare for project deletion
  const handleDeleteConfirm = (id: number) => {
    setConfirmDelete(id);
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  // Delete a project
  const handleDelete = async (id: number) => {
    const formData = new FormData();
    formData.append('id', id.toString());
    
    try {
      await deleteAction(formData);
      setConfirmDelete(null);
    } catch (error) {
      console.error("Failed to delete project:", error);
      // Error will be shown by the server action
    }
  };

  // If editing a project, show the edit form
  if (editingProject) {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Project: {editingProject.title}</h2>
          <button
            onClick={handleCancelEdit}
            className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
          >
            Back to List
          </button>
        </div>
        <ProjectForm
          mode="update"
          action={updateAction}
          project={editingProject}
        />
      </div>
    );
  }

  // Show the project table
  return (
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
        {projects.length === 0 ? (
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
                  {project.technologiesUsed.map((tech: string, index: number) => (
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
                {confirmDelete === project.id ? (
                  <div className="flex justify-end items-center space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">Confirm?</span>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Yes
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteConfirm(project.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
} 