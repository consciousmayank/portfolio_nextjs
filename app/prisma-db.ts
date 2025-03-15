import { PrismaClient } from '@prisma/client'

// Use a global variable to prevent multiple instances in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

// Create a prisma client with error handling
function createPrismaClient() {
  try {
    const client = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    })
    
    // Add middleware for better error handling
    client.$use(async (params, next) => {
      try {
        return await next(params)
      } catch (error) {
        console.error(`Prisma ${params.model}.${params.action} error:`, error)
        throw error
      }
    })
    
    return client
  } catch (error) {
    console.error("Failed to create Prisma client:", error)
    throw new Error("Database connection failed")
  }
}

// Use global variable in development to prevent hot-reload issues
const prisma = global.prisma || createPrismaClient()

// In development, attach to global to prevent multiple instances
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

export default prisma

// const seedProjects = async () => {
//     const projectsCount = await prisma.projectInfo.count()
//     if (projectsCount > 0) return

//     await prisma.projectInfo.createMany({
//         data: [
//             {
//                 title: 'Project 1',
//                 description: 'Description 1',
//                 role: 'Role 1',
//                 links: ['https://example.com'],
//                 technologiesUsed: ['Technology 1', 'Technology 2'],
//                 image: 'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU'
//             },
//             {
//                 title: 'Project 2',
//                 description: 'Description 2',
//                 role: 'Role 2',
//                 links: ['https://example.com'],
//                 technologiesUsed: ['Technology 3', 'Technology 4'],
//                 image: 'https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ'
//             }
//         ]
//     })
// }

// seedProjects()


// CRUD operations for ProjectInfo
import { ProjectInfo } from '@prisma/client'

type ProjectCreateInput = {
    title: string
    description: string
    role: string
    links: string[]
    technologiesUsed: string[]
    image: string
}

type ProjectUpdateInput = Partial<ProjectCreateInput>

// Create a new project
export const createProject = async (input: ProjectCreateInput): Promise<ProjectInfo> => {
    console.log('Creating project:', input)
    return await prisma.projectInfo.create({
        data: {
            title: input.title,
            description: input.description,
            role: input.role,
            links: JSON.stringify(input.links),
            technologiesUsed: JSON.stringify(input.technologiesUsed),
            image: input.image
        }
    })
}

// Read all projects
export const getAllProjects = async (): Promise<ProjectInfo[]> => {
    console.log('Getting all projects')
    return await prisma.projectInfo.findMany()
}

// Read single project by id
export const getProjectById = async (id: number): Promise<ProjectInfo | null> => {
    console.log('Getting project by id:', id)
    return await prisma.projectInfo.findUnique({
        where: {
            id
        }
    })
}

// Update project
export const updateProject = async (
    id: number,
    data: ProjectUpdateInput
): Promise<ProjectInfo> => {
    console.log('Updating project with id:', id)
    const updateData: Partial<Record<keyof ProjectInfo, unknown>> = {...data}
    if (data.links) {
        updateData.links = JSON.stringify(data.links)
    }
    if (data.technologiesUsed) {
        updateData.technologiesUsed = JSON.stringify(data.technologiesUsed)
    }
    
    return await prisma.projectInfo.update({
        where: {
            id
        },
        data: updateData as ProjectUpdateInput
    })
}

// Delete project
export const deleteProject = async (id: number): Promise<ProjectInfo> => {
    console.log('Deleting project with id:', id)
    return await prisma.projectInfo.delete({
        where: {
            id
        }
    })
}

