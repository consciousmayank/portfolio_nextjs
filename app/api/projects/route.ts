import { NextResponse } from 'next/server';
import { getAllProjects } from '../../prisma-db';

export const dynamic = 'force-dynamic'; // Ensures the route is dynamically rendered

export async function GET() {
  try {
    const projects = await getAllProjects();
    
    // Create headers with cache-control directives
    const headers = new Headers({
      'Cache-Control': 'no-cache, no-store, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    
    return NextResponse.json(
      { success: true, data: projects },
      { 
        status: 200,
        headers: headers
      }
    );
  } catch (error) {
    console.error("API Error fetching projects:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch projects" },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  }
} 