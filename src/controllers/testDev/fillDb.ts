import { Response, Request } from "express"
import {
  UserModel,
  ProjectModel,
  CommentModel,
  ImagesModel,
  PaymentsModel
} from "../../config/db"
import axios from "axios"
import userData from "../../utils/FullDB/user.json"
import projectData from "../../utils/FullDB/projects.json"
import commentsData from "../../utils/FullDB/comments.json"
import nameProjectSindescription from "../../utils/FullDB/nameProjectSindescription.json"
import nameUserId from "../../utils/FullDB/nameUserId.json"

import { faker } from "@faker-js/faker"
import dotenv from "dotenv"
dotenv.config()
const RAILWAY = process.env.RAILWAY

const fillDb = async (_req: Request, res: Response) => {
  try {
    //! USER
    // Base de busqueda
    // console.log(projectData.length)
    // console.log(userData.length)

    Promise.all(
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
        const MathR1 = Math.floor(Math.random() * 100000)
        const MathR2 = Math.floor(Math.random() * 100000)
        const newPercentage = Math.floor((MathR1 * 100) / MathR2)
        let reached = false
        if (newPercentage >= 100) reached = true
        if (!project) return
        await ProjectModel.create({
          id: +project.id,
          title: project.title,
          description: project.description,
          shortDescription: project.shortDescription,
          fundingCurrent: MathR1,
          fundingGoal: MathR2,
          fundingGoalReached: reached,
          fundingPercentage: newPercentage,
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
          disLikes: comment.disLikes,
          date: faker.date
            .between({
              from: "2019-01-01T00:00:00.000Z",
              to: "2023-07-01T00:00:00.000Z"
            })
            .toDateString()
        })
      })
    )
    for (let i = 1; i <= 50; i++) {
      let objectImage: any[] = []

      objectImage = (
        await axios.get(`${RAILWAY}/blobRoute/getAllFiles/crew${i}`)
      ).data
      console.log(objectImage)
      objectImage.forEach((object) => {
        ImagesModel.create({
          name: object.name,
          url: object.url,
          projectId: i.toString()
        })
      })
    }

    for (let i = 1; i <= 200; i++) {
      const random1 = Math.floor(Math.random() * 25)
      const random2 = Math.floor(Math.random() * 50)
      const random3 = Math.floor(Math.random() * 50000)

      const transactionAmount2 = random3
      const transactionReceived2 = Math.floor((5 * random3) / 100)

      const isApproved = Math.random() < 0.5 // Genera un valor aleatorio entre 0 y 1 y verifica si es menor a 0.5
      const isAccredited = Math.random() < 0.5 // Genera un valor aleatorio entre 0 y 1 y verifica si es menor a 0.5

      const status2 = isApproved ? "approved" : "rejected"
      const statusDetail2 = isAccredited ? "accredited" : "not_accredited"

      await PaymentsModel.create({
        id: i,
        payerId: Math.floor(Math.random() * 9000000000).toString(),
        currencyId: "ARS",
        description: nameProjectSindescription[random2].title,
        operationType: "regular_payment",
        orderId: Math.floor(Math.random() * 90000000000).toString(),
        ordertype: "mercadopago",
        firstName: nameUserId[random1].name || "luis",
        lastName: faker.person.lastName(),
        email: faker.internet.email({
          firstName: nameUserId[random1].name || "luis2"
        }),
        identificationNumber: Math.floor(Math.random() * 50).toString(),
        identificationType: "DNI",
        phoneAreaCode: Math.floor(Math.random() * 50).toString(),
        phoneNumber: faker.phone.toString(),
        phoneExtension: Math.floor(Math.random() * 50).toString(),
        type: "type",
        entityType: "entityType",
        paymentMetodId: "account_money",
        status: status2,
        statusDetail: statusDetail2,
        taxesAmount: 0,
        transactionAmount: transactionAmount2,
        transactionAmountRefunded: 0,
        transactionReceived: transactionReceived2,
        dateApproved: faker.date
          .between({
            from: "2023-06-01T00:00:00.000Z",
            to: "2023-07-01T00:00:00.000Z"
          })
          .toDateString(),
        dateCreated: faker.date
          .between({
            from: "2023-04-01T00:00:00.000Z",
            to: "2023-05-01T00:00:00.000Z"
          })
          .toDateString(),
        userId: nameUserId[random1].userId.toString(),
        projectId: nameProjectSindescription[random2].id.toString()
      })
    }

    // await userData.length
    res.status(200).json("Listo")
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
