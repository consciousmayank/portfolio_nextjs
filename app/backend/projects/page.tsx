import { revalidatePath } from "next/cache";
import prisma from "@/app/prisma-db";
import ProjectTable from "./components/ProjectTable";
import AddProjectButton from "./components/AddProjectButton";
import { ProjectInfo } from "@/app/classes/ProjectInfo";

// Server action to fetch all projects
async function getProjects() {
  try {
    const projectsData = await prisma.projectInfo.findMany({
      orderBy: {
        id: 'asc'
      }
    });
    
    // Transform the data to handle JSON string fields
    return projectsData.map(project => ({
      ...project,
      technologiesUsed: JSON.parse(project.technologiesUsed?.toString() || '[]'),
      links: JSON.parse(project.links?.toString() || '[]')
    }));
  } catch (error) {
    console.error("Error fetching projects:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to fetch projects: ${errorMessage}`);
  }
}

// Server action to create a project
async function createProject(formData: FormData) {
  'use server';
  
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const role = formData.get('role') as string;
    const image = formData.get('image') as string;
    
    // Get all technologies (they'll be named 'tech-0', 'tech-1', etc.)
    const technologiesUsed: string[] = [];
    formData.forEach((value, key) => {
      if (key.startsWith('tech-') && value.toString().trim()) {
        technologiesUsed.push(value.toString().trim());
      }
    });
    
    // Get all links (they'll be named 'link-0', 'link-1', etc.)
    const links: string[] = [];
    formData.forEach((value, key) => {
      if (key.startsWith('link-') && value.toString().trim()) {
        links.push(value.toString().trim());
      }
    });

    // Validate required fields
    if (!title || !description || !role) {
      throw new Error('Missing required fields');
    }
    
    // Create the project
    await prisma.projectInfo.create({
      data: {
        title,
        description,
        role,
        image: image || '',
        technologiesUsed: JSON.stringify(technologiesUsed),
        links: JSON.stringify(links)
      }
    });
    
    revalidatePath('/backend/projects');
  } catch (error) {
    console.error("Error creating project:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to create project: ${errorMessage}`);
  }
}

// Server action to update a project
async function updateProject(formData: FormData) {
  'use server';
  
  try {
    const id = parseInt(formData.get('id') as string);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const role = formData.get('role') as string;
    const image = formData.get('image') as string;
    
    // Get all technologies
    const technologiesUsed: string[] = [];
    formData.forEach((value, key) => {
      if (key.startsWith('tech-') && value.toString().trim()) {
        technologiesUsed.push(value.toString().trim());
      }
    });
    
    // Get all links
    const links: string[] = [];
    formData.forEach((value, key) => {
      if (key.startsWith('link-') && value.toString().trim()) {
        links.push(value.toString().trim());
      }
    });

    // Validate required fields
    if (!title || !description || !role) {
      throw new Error('Missing required fields');
    }
    
    // Check if project exists
    const existingProject = await prisma.projectInfo.findUnique({
      where: { id }
    });
    
    if (!existingProject) {
      throw new Error('Project not found');
    }
    
    // Update the project
    await prisma.projectInfo.update({
      where: { id },
      data: {
        title,
        description,
        role,
        image: image || '',
        technologiesUsed: JSON.stringify(technologiesUsed),
        links: JSON.stringify(links)
      }
    });
    
    revalidatePath('/backend/projects');
  } catch (error) {
    console.error("Error updating project:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to update project: ${errorMessage}`);
  }
}

// Server action to delete a project
async function deleteProject(formData: FormData) {
  'use server';
  
  try {
    const id = parseInt(formData.get('id') as string);
    
    // Check if project exists
    const existingProject = await prisma.projectInfo.findUnique({
      where: { id }
    });
    
    if (!existingProject) {
      throw new Error('Project not found');
    }
    
    // Delete the project
    await prisma.projectInfo.delete({
      where: { id }
    });
    
    revalidatePath('/backend/projects');
  } catch (error) {
    console.error("Error deleting project:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to delete project: ${errorMessage}`);
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
