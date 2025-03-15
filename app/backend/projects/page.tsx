export const dynamic = 'force-dynamic';

import prisma from "@/app/prisma-db";
import ProjectTable from "./components/ProjectTable";
import AddProjectButton from "./components/AddProjectButton";
import { ProjectInfo } from "@/app/classes/ProjectInfo";
import { revalidatePath } from "next/cache";

// Server action to fetch all projects
async function getProjects() {
  try {
    // Direct database call using Prisma
    const projectsData = await prisma.projectInfo.findMany();
    // Transform the data to handle JSON string fields
    return projectsData.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      role: project.role,
      image: project.image,
      technologiesUsed: JSON.parse(project.technologiesUsed?.toString() || '[]'),
      links: JSON.parse(project.links?.toString() || '[]')
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error(`Failed to fetch projects: ${error}`);
  }
}

// Server action to create a project
async function createProject(formData: FormData) {
  'use server';
  
  try {
    // Parse and validate form fields
    const title = String(formData.get('title') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const role = String(formData.get('role') || '').trim();
    const image = String(formData.get('image') || '').trim();
    
    // Get all technologies
    const technologiesUsed: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('tech-') && String(value).trim()) {
        technologiesUsed.push(String(value).trim());
      }
    }
    
    // Get all links
    const links: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('link-') && String(value).trim()) {
        links.push(String(value).trim());
      }
    }

    // Validate required fields
    if (!title) throw new Error('Title is required');
    if (!description) throw new Error('Description is required');
    if (!role) throw new Error('Role is required');
    
    // Create the project with safe JSON serialization
    await prisma.projectInfo.create({
      data: {
        title,
        description,
        role,
        image,
        technologiesUsed: JSON.stringify(technologiesUsed || []),
        links: JSON.stringify(links || [])
      }
    });
    
    revalidatePath('/backend/projects');
  } catch (error) {
    console.error("Error creating project:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to create project: ${error.message}`);
    } else {
      throw new Error('Failed to create project: Unknown error occurred');
    }
  }
}

// Server action to update a project
async function updateProject(formData: FormData) {
  'use server';
  
  try {
    // Parse and validate ID
    const idValue = formData.get('id');
    if (!idValue) throw new Error('Project ID is required');
    const id = parseInt(String(idValue).trim(), 10);
    if (isNaN(id) || id <= 0) throw new Error('Invalid project ID');

    // Parse and validate form fields
    const title = String(formData.get('title') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const role = String(formData.get('role') || '').trim();
    const image = String(formData.get('image') || '').trim();
    
    // Get all technologies
    const technologiesUsed: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('tech-') && String(value).trim()) {
        technologiesUsed.push(String(value).trim());
      }
    }
    
    // Get all links
    const links: string[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('link-') && String(value).trim()) {
        links.push(String(value).trim());
      }
    }

    // Validate required fields
    if (!title) throw new Error('Title is required');
    if (!description) throw new Error('Description is required');
    if (!role) throw new Error('Role is required');
    
    // Update the project
    await prisma.projectInfo.update({
      where: { id },
      data: {
        title,
        description,
        role,
        image,
        technologiesUsed: JSON.stringify(technologiesUsed || []),
        links: JSON.stringify(links || [])
      }
    });
    
    revalidatePath('/backend/projects');
  } catch (error) {
    console.error("Error updating project:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to update project: ${error.message}`);
    } else {
      throw new Error('Failed to update project: Unknown error occurred');
    }
  }
}

// Server action to delete a project
async function deleteProject(formData: FormData) {
  'use server';
  
  try {
    const idValue = formData.get('id');
    if (!idValue) throw new Error('Project ID is required');
    
    // Parse and validate ID
    const idString = String(idValue).trim();
    const id = parseInt(idString, 10);
    if (isNaN(id) || id <= 0) throw new Error('Invalid project ID');
    
    // Delete the project
    await prisma.projectInfo.delete({
      where: { id }
    });
    
    revalidatePath('/backend/projects');
  } catch (error) {
    console.error("Error deleting project:", error);
    if (error instanceof Error) {
      throw new Error(`Failed to delete project: ${error.message}`);
    } else {
      throw new Error('Failed to delete project: Unknown error occurred');
    }
  }
}

// Main page component (server component)
export default async function ProjectsManagement() {
  const projects = await getProjects();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with server-rendered parts and client "Add Project" button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Projects Management</h1>
          <div className="flex space-x-4">
            <a
              href="/backend"
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors duration-300"
            >
              Back to Dashboard
            </a>
            {/* Client component for modal functionality */}
            <AddProjectButton createAction={createProject} />
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <ProjectTable 
            projects={projects as ProjectInfo[]} 
            updateAction={updateProject} 
            deleteAction={deleteProject}
          />
        </div>
      </div>
    </div>
  );
}
