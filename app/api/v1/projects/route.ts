import prisma from "@/app/prisma-db";
import { NextResponse } from "next/server";



// GET /api/projects - Get all projects
export async function GET() {
  try {
    const projectsData = await prisma.projectInfo.findMany({
      orderBy: {
        id: 'asc'
      }
    });
    
    // Transform the data to handle JSON string fields
    const projects = projectsData.map(project => ({
      ...project,
      // These fields are stored as JSON strings in the db but need to be provided as parsed objects
      technologiesUsed: JSON.parse(project.technologiesUsed?.toString() || '[]'),
      links: JSON.parse(project.links?.toString() || '[]')
    }));
    
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project
export async function POST(request: Request) {
  try {
    const body = await request.json();

    let hasValidationErrors = false;
    const validationErrors: string[] = [];

    if(!body.title) {
      validationErrors.push("Title is required");
      hasValidationErrors = true;
    }

    if(!body.description) {
      validationErrors.push("Description is required");
      hasValidationErrors = true;
    }

    if(!body.role) {
      validationErrors.push("Role is required");
      hasValidationErrors = true;
    }
    
    if(hasValidationErrors) {
      return NextResponse.json(
        { error: "Missing required fields", errors: validationErrors },
        { status: 400 }
      );
    }
    
    // Create the project - ensure links and technologies are stored as JSON strings
    
    // Create the project - ensure links and technologies are stored as JSON strings
    const newProject = await prisma.projectInfo.create({
      data: {
        title: body.title,
        description: body.description,
        role: body.role,
        image: body.image,
        technologiesUsed: JSON.stringify(body.technologiesUsed || []),
        links: JSON.stringify(body.links || [])
      }
    });
    
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
} 