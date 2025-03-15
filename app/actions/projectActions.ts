"use server";

export async function getProjectsUsingApi() {
  try {
    // Determine the base URL for the API call
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    // If we're running on the server and have access to the request, use its origin
    if (!baseUrl) {
      // For server-side requests, we can use a relative URL
      baseUrl = '';
    }

    // Add a timestamp to the URL to prevent caching
    const url = `${baseUrl}/api/projects`;

    // Using fetch to call the API endpoint instead of directly accessing the database
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching projects from API:", error);
    return { success: false, error: "Failed to fetch projects" };
  }
} 