import { Response, Request } from "express"
import { UserModel, ProjectModel, CommentModel } from "../../config/db"

import userData from "../../utils/FullDB/user.json"
import projectData from "../../utils/FullDB/projects.json"
import commentsData from "../../utils/FullDB/comments.json"

import { faker } from "@faker-js/faker"

const fillDb = async (_req: Request, res: Response) => {
  try {
    //! USER
    // Base de busqueda
    console.log(projectData.length)
    console.log(userData.length)

    const newUsers: Promise<UserModel[]> = Promise.all(
      userData.map(async (user) => {
        return await UserModel.create({
          id: user.id,
          name: user.name,
          lastName: user.lastName,
          email: user.email,
          country: user.country,
          city: user.city,
          postalCode: user.postalCode,
          shortDescription: user.shortDescription,
          aboutMe: user.aboutMe,
          avatar: faker.image.avatarLegacy(),
          date: faker.date
            .between({
              from: "2019-01-01T00:00:00.000Z",
              to: "2023-07-01T00:00:00.000Z"
            })
            .toString()
          // projects: user.projectId
        })
      })
    )

    Promise.all(
      projectData.map(async (project) => {
        if (!project) return
        await ProjectModel.create({
          id: +project.id,
          title: project.title,
          description: project.description,
          shortDescription: project.shortDescription,
          fundingCurrent: Math.floor(Math.random() * 100000),
          fundingGoal: Math.floor(Math.random() * 100000),
          fundingGoalReached: project.fundingGoalReached,
          fundingPercentage: Math.floor(project.fundingPercentage),
          fundingDayLeft: project.fundingDayLeft,
          likes: project.likes,
          disLikes: project.disLikes,
          category: project.category,
          // bank: project.bank,
          account: project.account,
          location: project.location,
          projectFase: project.projectFase,
          displayProject: project.displayProject,
          creatorId: project.creatorId
          // createdAt: project.createdAt,
          // updatedAt: project.updatedAt,
        })
      })
    )

    Promise.all(
      commentsData.map(async (comment) => {
        if (!comment) return
        await CommentModel.create({
          projectId: comment.projectId,
          userId: comment.userId,
          name: comment.name,
          description: comment.description,
          likes: comment.likes,
          dislikes: comment.disLikes,
          date: faker.date
            .between({
              from: "2019-01-01T00:00:00.000Z",
              to: "2023-07-01T00:00:00.000Z"
            })
            .toDateString()
        })
      })
    )

    // await userData.length
    res.status(200).json(newUsers)
  } catch (error) {
    const errorMessage =
      (error as Error).message || "Unknown error while retrieving all projects"
    res.status(400).send(errorMessage)
  }
}

export default fillDb

// //! USER
// // Base de busqueda
// const user = await UserModel.findByPk("123456")
// if (!user) throw new Error("User not found")
// const project = await ProjectModel.findByPk(
//   "31ffa365-86e8-42d3-a173-506ea427b2cc"
// )
// if (!project) throw new Error("Project not found")
// const payment = await PaymentsModel.findByPk("1315896961")
// if (!payment) throw new Error("Payment not found")

// Obtengo los projectos asociados
// const getAllProjects = await user.$get("projects")

// Cuento los registros asociados
// const countedProjects = await user.$count("projects")

// Verifico si tiene registros Asociados (projects es una instancia especifica del projecto se ven en)
// const createdProjectID = "31ffa365-86e8-42d3-a173-506ea427b2cc"
// const isAsociated = await user.$has("projects", createdProjectID)

// ELimino un projecto asociado al usuario
// const projectId = '123456'
// await user.$remove("projects", projectId)

//! Projects

// Obtengo los usuarios asociados
// const getAllUsers = await project.$get("user")

//! Payments
// const userPayments = await user.$get("userPayments")
// user.$add("userPayment" /* instance */).then(/* ... */)
// user.$get("userPayment").then(/* ... */)
// user.$count("userPayment").then(/* ... */)
// user.$has("userPayment").then(/* ... */)
// user.$remove("userPayment" /* instance */).then(/* ... */)
// user.$create("userPayment" /* value */).then(/* ... */)
