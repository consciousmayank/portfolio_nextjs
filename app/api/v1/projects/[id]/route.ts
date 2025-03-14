import prisma from "@/app/prisma-db";
import { NextRequest, NextResponse } from "next/server";

// This type is not needed - Next.js uses its own typing
// interface RouteParams {
//   params: {
//     id: string;
//   };
// }

// GET /api/projects/[id] - Get a single project
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }
    
    const project = await prisma.projectInfo.findUnique({
      where: { id }
    });
    
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    
    // Parse JSON strings for array fields
    return NextResponse.json({
      ...project,
      technologiesUsed: JSON.parse(project.technologiesUsed?.toString() || '[]'),
      links: JSON.parse(project.links?.toString() || '[]' )
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - Update a project
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description || !body.role || !body.image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Check if project exists
    const existingProject = await prisma.projectInfo.findUnique({
      where: { id }
    });
    
    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    
    // Update the project
    const updatedProject = await prisma.projectInfo.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        role: body.role,
        image: body.image,
        technologiesUsed: JSON.stringify(body.technologiesUsed || []),
        links: JSON.stringify(body.links || [])
      }
    });
    
    return NextResponse.json(updatedProject, { status: 200 });
    
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = parseInt((await params).id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }
    
    // Check if project exists
    const existingProject = await prisma.projectInfo.findUnique({
      where: { id }
    });
    
    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    
    // Delete the project
    await prisma.projectInfo.delete({
      where: { id }
    });
    
    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
    
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
} 