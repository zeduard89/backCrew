import { ProjectModel } from "../../config/db"
// import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

// let URL: string | undefined
// if (process.env.RAILWAY != null) URL = process.env.RAILWAY
// else URL = "http://localhost:3001"
// const URL = "http://localhost:3001"

const getAllProjects = async (): Promise<object> => {
  try {
    const newExistingProject = await ProjectModel.findAll()
    // const existingProject = await ProjectModel.findAll()

    // const newExistingProject = await Promise.all(
    //   existingProject.map(async (project) => {
    //     let objectImage: any[] = []
    //     if (project.id.length < 4) {
    //       objectImage = (
    //         await axios.get(`${URL}/blobRoute/getAllFiles/crew${project.id}`)
    //       ).data
    //     }
    //     if (project.id.length > 4) {
    //       objectImage = (
    //         await axios.get(`${URL}/blobRoute/getAllFiles/${project.id}`)
    //       ).data
    //     }
    //     const mainImage: string[] = Array.isArray(objectImage)
    //       ? objectImage.map((image: any) => image.url)
    //       : []

    //     return {
    //       ...project,
    //       mainImage
    //     }
    //   })
    // )

    if (Object.keys(newExistingProject).length === 0) {
      throw new Error("There are no projects in the DB")
    }
    return newExistingProject
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while retrieving all projects"
    return { errorMessage }
  }
}

export default getAllProjects
