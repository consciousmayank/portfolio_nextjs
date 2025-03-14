// app/api/health/route.ts
import prisma from "@/app/prisma-db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Attempt to connect to the database with a simple query
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "Database connected successfully" }, { status: 200 });
  } catch (error) {
    console.error("Database connection error:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error';
    return NextResponse.json(
      { error: "Database connection failed", message: errorMessage },
      { status: 500 }
    );
  }
}