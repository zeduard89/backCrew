import server from "../../config/server"
import request from "supertest"
import { ProjectModel } from "../../config/db"
import { ErrorBody } from "../../types/types"

// Projecto Random , con un ID de usuario Real para POST project
const newProject = {
  title: "projectExample",
  description: "Ese te un ejemplo de una descripcion",
  shortDescription: "Esto es una descripcion corta",
  fundingGoal: 2000,
  fundingDayLeft: 30,
  category: "Tech & Innovation",
  creatorId: "ac8ec82d-fc39-450b-bcab-bc2cc4b539b1"
}

describe("Create Project", () => {
  // CREATE PROJECT
  test(" Create Project should respond with a 200 status code", async () => {
    const response = await request(server)
      .post("/projectRoute/")
      .send(newProject)
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body.message).toBeDefined() // Verificar que 'message' está definido
    expect(response.body.message).toBeTruthy() // Verificar que 'message' no está vacío
  }, 20000)

  test("Create Project, when some project are missing", async () => {
    const response = await request(server).post("/projectRoute/").send({})
    expect(response.status).toBe(400)
    // expect(response.text).toContain("Required")
    expect(response.clientError).toBe(true)
    // Parsea el cuerpo de la respuesta como objeto JSON
    const errorBody = JSON.parse(response.text)
    // Garantizan que cada objeto de error devuelto tenga las propiedades esperadas y que no estén definidas como undefined.
    errorBody.forEach((error: ErrorBody) => {
      expect(error.code).toBeDefined()
      expect(error.expected).toBeDefined()
      expect(error.received).toBeDefined()
      expect(error.path).toBeDefined()
    })
  })
})

describe("Fill DB", () => {
  test("Fill DB, query is missing", async () => {
    const response = await request(server)
      .post("/projectRoute/llenarDB")
      .query({}) // Asegúrate de proporcionar una consulta de usuarios válida aquí
    expect(response.status).toBe(400)
    expect(response.text).toContain("Users Query is Missing")
  })

  test("Fill DB,should respond with status 200 status code", async () => {
    const response = await request(server)
      .post("/projectRoute/llenarDB")
      .query({ usuarios: 1 })
    expect(response.status).toBe(200)
    expect(response.text).toContain("Database filled successfully")
  })
})

const updateFieldsErrorType = {
  id: 1,
  title: 1,
  description: 1,
  shortDescription: 1,
  fundingGoal: "Hola",
  fundingDayLeft: "Hola",
  category: 1
}

describe("Update project Info", () => {
  test("Update Project should respond with a 200 status code", async () => {
    const findedNewProject = await ProjectModel.findOne({
      where: { title: newProject.title }
    })

    const updateFields = {
      id: findedNewProject?.id,
      title: "here a Random title" + Math.random(),
      description: "Its just a Description",
      shortDescription: "Just another short Description",
      fundingGoal: 2000,
      fundingDayLeft: 30,
      category: "Tech & Innovation"
    }
    const response = await request(server)
      .put("/projectRoute/update")
      .send(updateFields)
    expect(response.status).toBe(200)
    expect(response.text).toContain(
      `Successful update of the project with ID: ${findedNewProject?.id}`
    )
  })

  test("Update project, when query is missing", async () => {
    const response = await request(server).put("/projectRoute/update").send({})
    expect(response.status).toBe(400)
    expect(response.text).toContain("All fields are required")
  })

  test("error type", async () => {
    const response = await request(server)
      .put("/projectRoute/update")
      .send(updateFieldsErrorType)
    expect(response.status).toBe(400)

    // Se espera true, para indicar que es error del usuario
    expect(response.clientError).toBe(true)
    const errorBody = JSON.parse(response.text)

    errorBody.forEach((error: ErrorBody) => {
      expect(error.code).toBeDefined()
      expect(error.expected).toBeDefined()
      expect(error.received).toBeDefined()
      expect(error.path).toBeDefined()
    })
  })
})

describe("Update Project Funding Current", () => {
  test("Update FundingCurrent ,should respond with a 200 status code", async () => {
    const findedNewProject = await ProjectModel.findOne({
      where: { title: newProject.title }
    })
    if (!findedNewProject) return
    const updateFundingCurrent = {
      id: findedNewProject.id,
      addToFundingCurrent: 1000
    }
    const response = await request(server)
      .put("/projectRoute/update/addToFundingCurrent")
      .send(updateFundingCurrent)
    expect(response.status).toBe(200)
    expect(response.text).toContain(
      "Successfully modified the value of fundingCurrent and fundingPercentage"
    )
  })

  test("update fundingCurrent error type", async () => {
    const response = await request(server)
      .put("/projectRoute/update/addToFundingCurrent")
      .send({})
    expect(response.status).toBe(400)

    // Se espera true, para indicar que es error del usuario
    expect(response.clientError).toBe(true)
    const errorBody = JSON.parse(response.text)

    errorBody.forEach((error: ErrorBody) => {
      expect(error.code).toBeDefined()
      expect(error.expected).toBeDefined()
      expect(error.received).toBeDefined()
      expect(error.path).toBeDefined()
    })
  })
})

describe("Update Project likes", () => {
  test("Update project's like should respond with a 200 status code", async () => {
    const findedNewProject = await ProjectModel.findOne({
      where: { title: newProject.title }
    })
    if (!findedNewProject) return
    const likes = {
      id: findedNewProject.id,
      likes: 100,
      disLikes: 0
    }
    const response = await request(server)
      .put("/projectRoute/update/likes")
      .send(likes)
    expect(response.status).toBe(200)
    expect(response.text).toContain("Successfully modified the values of likes")
  })

  test("update Project's likes error type", async () => {
    const response = await request(server)
      .put("/projectRoute/update/likes")
      .send({})
    expect(response.status).toBe(400)

    // Se espera true, para indicar que es error del usuario
    expect(response.clientError).toBe(true)
    const errorBody = JSON.parse(response.text)

    errorBody.forEach((error: ErrorBody) => {
      expect(error.code).toBeDefined()
      expect(error.expected).toBeDefined()
      expect(error.received).toBeDefined()
      expect(error.path).toBeDefined()
    })
  })
})

describe("Search Single Project by Name", () => {
  test("Search Single Project Name, should respond with a 200 status code", async () => {
    const findedNewProject = await ProjectModel.findOne({
      where: { title: newProject.title }
    })
    if (!findedNewProject) return
    const response = await request(server)
      .get("/projectRoute/search/byName")
      .query({ name: findedNewProject.title })
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
  })

  test("Search Single Project Name,type of query should be string", async () => {
    const response = await request(server)
      .get("/projectRoute/search/byName")
      .query({})
    expect(response.status).toBe(400)
    expect(response.clientError).toBe(true)
    const errorBody = JSON.parse(response.text)
    expect(errorBody[0].code).toBeDefined()
    expect(errorBody[0].expected).toBeDefined()
    expect(errorBody[0].received).toBeDefined()
    expect(errorBody[0].path).toBeDefined()
  })
})

describe("Search Single Project by ID", () => {
  test("Search Single Project by ID,should respond with a 200 status code", async () => {
    const findedNewProject = await ProjectModel.findOne({
      where: { title: newProject.title }
    })
    if (!findedNewProject) return
    const response = await request(server)
      .get("/projectRoute/search/byId")
      .query({ id: findedNewProject.id })
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toBeDefined() // Verificar que 'message' está definido
    expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
  })

  test("Search Single Project by ID,when query is missing", async () => {
    const response = await request(server)
      .get("/projectRoute/search/byId")
      .query({})
    expect(response.status).toBe(400)
    expect(response.clientError).toBe(true)
    expect(response.body).toBeDefined() // Verificar que 'message' está definido
    expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
    const errorBody = JSON.parse(response.text)
    expect(errorBody[0].code).toBeDefined()
    expect(errorBody[0].expected).toBeDefined()
    expect(errorBody[0].received).toBeDefined()
    expect(errorBody[0].path).toBeDefined()
  })
})

describe("Search General Project By Name", () => {
  test("General Project By Name, should respond with a 200 status code", async () => {
    const findedNewProject = await ProjectModel.findOne({
      where: { title: newProject.title }
    })
    if (!findedNewProject) return
    const response = await request(server)
      .get("/projectRoute/search/byNameGeneral")
      .query({ name: findedNewProject.title })
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toBeDefined() // Verificar que 'message' está definido
    expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
  })

  test("General Project By Name,when query is missing", async () => {
    const response = await request(server)
      .get("/projectRoute/search/byNameGeneral")
      .query({})
    expect(response.status).toBe(400)
    expect(response.clientError).toBe(true)
    expect(response.body).toBeDefined() // Verificar que 'message' está definido
    expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
    const errorBody = JSON.parse(response.text)
    expect(errorBody[0].code).toBeDefined()
    expect(errorBody[0].expected).toBeDefined()
    expect(errorBody[0].received).toBeDefined()
    expect(errorBody[0].path).toBeDefined()
  })
})

const category = "all"
const sort = "most funding"
const q = ""
const s = 2
const p = 1
const country = "Argentina"

describe("Search Filtered Projects", () => {
  test("Filtered should respond with a 200 status code", async () => {
    const response = await request(server)
      .get("/projectRoute/searchProjects/")
      .query({ category, sort, q, p, s, country })
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toBeDefined() // Verificar que 'message' está definido
    expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
  })

  test("when Filtered querys are missing", async () => {
    const response = await request(server)
      .get("/projectRoute/searchProjects/")
      .query({})
    expect(response.status).toBe(400)
    expect(response.clientError).toBe(true)
    expect(response.body).toBeDefined() // Verificar que 'message' está definido
    expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
    const errorBody = JSON.parse(response.text)
    expect(errorBody[0].code).toBeDefined()
    expect(errorBody[0].expected).toBeDefined()
    expect(errorBody[0].received).toBeDefined()
    expect(errorBody[0].path).toBeDefined()
  })
})

describe("Search day Left", () => {
  test("Day Lefts, should respond with a 200 status code", async () => {
    const findedNewProject = await ProjectModel.findOne({
      where: { title: newProject.title }
    })
    if (!findedNewProject) return
    const response = await request(server)
      .get("/projectRoute/search/daysleft")
      .query({ id: findedNewProject.id })
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toBeDefined() // Verificar que 'message' está definido
    expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
  })

  test("when DayLefts,querys are missing", async () => {
    const response = await request(server)
      .get("/projectRoute/search/daysleft")
      .query({})
    expect(response.status).toBe(400)
    expect(response.clientError).toBe(true)
    expect(response.body).toBeDefined() // Verificar que 'message' está definido
    expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
    const errorBody = JSON.parse(response.text)
    expect(errorBody[0].code).toBeDefined()
    expect(errorBody[0].expected).toBeDefined()
    expect(errorBody[0].received).toBeDefined()
    expect(errorBody[0].path).toBeDefined()
  })
})

describe("get All Projects", () => {
  test("Search All Projects in DB", async () => {
    const response = await request(server).get("/projectRoute/allProjects")
    if (Object.keys(response).length === 0) {
      expect(response.status).toBe(400)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toBeDefined() // Verificar que 'message' está definido
      expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
    } else {
      expect(response.status).toBe(200)
      expect(response.body).toBeInstanceOf(Object)
      expect(response.body).toBeDefined() // Verificar que 'message' está definido
      expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
    }
  })
})

describe("Five most Funding", () => {
  test("Five most Funding,should respond with a 200 status code", async () => {
    const response = await request(server).get("/projectRoute/fiveMostFunding")
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toBeDefined() // Verificar que 'message' está definido
    expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
  })
})

describe("Twenty most trending", () => {
  test("Twenty most trending, should respond with a 200 status code", async () => {
    const response = await request(server).get(
      "/projectRoute/twentyMostTrending"
    )
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toBeDefined() // Verificar que 'message' está definido
    expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
  })
})

describe("Logic Delete Project", () => {
  test("Logic Delete should respond with a 200 status code", async () => {
    const findedNewProject = await ProjectModel.findOne({
      where: { title: newProject.title }
    })
    if (!findedNewProject) return
    const response = await request(server)
      .delete("/projectRoute/deleteProject")
      .send({ id: findedNewProject.id, displayProject: true })
    expect(response.status).toBe(200)
    expect(response.text).toContain("Successful change displayProject")
  })

  test("Logic Delete Project, querys are missing", async () => {
    const response = await request(server)
      .delete("/projectRoute/deleteProject")
      .send({})
    expect(response.status).toBe(400)
    expect(response.clientError).toBe(true)
    expect(response.body).toBeDefined() // Verificar que 'message' está definido
    expect(response.body).toBeTruthy() // Verificar que 'message' no está vacío
    const errorBody = JSON.parse(response.text)
    errorBody.forEach((error: ErrorBody) => {
      expect(error.code).toBeDefined()
      expect(error.expected).toBeDefined()
      expect(error.received).toBeDefined()
      expect(error.path).toBeDefined()
    })
  })
})

describe("Delete Project", () => {
  // DELETE PROJECT from DB
  test("Delete Project should respond with a 200 status code", async () => {
    const findedNewProject = await ProjectModel.findOne({
      where: { title: newProject.title }
    })
    if (!findedNewProject) return
    const response = await request(server)
      .delete("/projectRoute/delete")
      .query({ projectId: findedNewProject.id })
    expect(response.text).toContain("Project Was Destroyed Successfully")
  }, 20000)

  test("Delete Project, when id project's don't founded", async () => {
    const response = await request(server)
      .delete("/projectRoute/delete")
      .query({})
    expect(response.status).toBe(400)
    expect(response.text).toContain("valid projectId is required")
  })
})

describe("*", () => {
  test("should respond with a 404 status code for undefined Routes ", async () => {
    const response = await request(server).get("/undefinedRoute")
    expect(response.status).toBe(404)
    expect(response.text).toContain("Cannot GET /undefinedRoute")
  })
})
