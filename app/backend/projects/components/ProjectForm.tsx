"use client";

import { useState } from "react";
import { ProjectInfo } from "@/app/classes/ProjectInfo";

interface ProjectFormProps {
  mode: "create" | "update";
  action: (formData: FormData) => Promise<void>;
  project?: ProjectInfo;
}

export default function ProjectForm({ mode, action, project }: ProjectFormProps) {
  const [technologiesUsed, setTechnologiesUsed] = useState<string[]>(
    project?.technologiesUsed || [""]
  );
  const [links, setLinks] = useState<string[]>(project?.links || [""]);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add new technology input
  const addTechnology = () => {
    setTechnologiesUsed([...technologiesUsed, ""]);
  };

  // Remove technology input
  const removeTechnology = (index: number) => {
    const newTechnologies = [...technologiesUsed];
    newTechnologies.splice(index, 1);
    setTechnologiesUsed(newTechnologies);
  };

  // Add new link input
  const addLink = () => {
    setLinks([...links, ""]);
  };

  // Remove link input
  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  // Update technology value
  const updateTechnology = (index: number, value: string) => {
    const newTechnologies = [...technologiesUsed];
    newTechnologies[index] = value;
    setTechnologiesUsed(newTechnologies);
  };

  // Update link value
  const updateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    // Store a reference to the form element
    const form = e.currentTarget;

    try {
      const formData = new FormData(form);
      
      // Add technologies and links to formData with indexed names
      technologiesUsed.forEach((tech, index) => {
        formData.append(`tech-${index}`, tech);
      });
      
      links.forEach((link, index) => {
        formData.append(`link-${index}`, link);
      });
      
      await action(formData);
      
      // Reset form if it's a create form
      if (mode === "create") {
        form.reset();
        setTechnologiesUsed([""]);
        setLinks([""]);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {formError && (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md mb-6">
          {formError}
          <button
            className="ml-2 text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-100"
            onClick={() => setFormError(null)}
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Hidden ID field for updates */}
        {project && <input type="hidden" name="id" value={project.id} />}

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            defaultValue={project?.title || ""}
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
            defaultValue={project?.description || ""}
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
            defaultValue={project?.role || ""}
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
            defaultValue={project?.image || ""}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
          />
        </div>

        {/* Technologies Used */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Technologies Used
          </label>
          {technologiesUsed.map((tech, index) => (
            <div key={`tech-${index}`} className="flex mb-2">
              <input
                type="text"
                value={tech}
                onChange={(e) => updateTechnology(index, e.target.value)}
                className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                placeholder="e.g., React, Next.js, Tailwind"
              />
              <button
                type="button"
                onClick={() => removeTechnology(index)}
                className="ml-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                disabled={technologiesUsed.length <= 1}
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTechnology}
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
          {links.map((link, index) => (
            <div key={`link-${index}`} className="flex mb-2">
              <input
                type="url"
                value={link}
                onChange={(e) => updateLink(index, e.target.value)}
                className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                placeholder="https://example.com"
              />
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="ml-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                disabled={links.length <= 1}
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addLink}
            className="mt-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
          >
            Add Link
          </button>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : mode === "create" ? "Create Project" : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
} 