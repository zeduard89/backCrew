import server from "../../config/server"
import request from "supertest"
// import { UserModel } from "../../config/db"
// import { ErrorBody } from "../../types/types"

// Un usuario nuevo, ID unico y EMAIL
const newUser = {
  id: "exampleIdUser123456",
  name: "exampleName",
  lastName: "exampleLastName",
  email: "exampleEmail@exampleGmail.com"
}

describe("Register User", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(server)
      .post("/userRoute/register")
      .send(newUser)
    expect(response.status).toBe(200)
    expect(response.text).toContain("User was registered successfully")
  })

  test("Register should respond with a 400 status code", async () => {
    const response = await request(server).post("/userRoute/register").send({})
    expect(response.status).toBe(400)
    expect(response.clientError).toBe(true)
    expect(response.text).toContain("Name, lastName, email and Id are Required")
  })
})

describe("User Detail", () => {
  test("User Detail should respond with a 200 status code", async () => {
    const response = await request(server)
      .get("/userRoute/userDetails")
      .query({ id: newUser.id })
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toBeTruthy()
    expect(response.body).toBeDefined()
  })
  test("User Info , querys are missing", async () => {
    const response = await request(server)
      .get("/userRoute/userDetails")
      .query({})
    expect(response.status).toBe(409)
    expect(response.clientError).toBe(true)
    expect(response.text).toBe("Id is required")
  })
})

describe("Get all Users", () => {
  test("Get all Users should respond with a 200 status code", async () => {
    const response = await request(server).get("/userRoute/getAllUsers")
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toBeTruthy()
    expect(response.body).toBeDefined()
  })
})

describe("All User's Projects", () => {
  test("All User's Projects should respond with a 200 status code", async () => {
    const response = await request(server)
      .get("/userRoute/getAllUsersProjects")
      .query({ creatorId: newUser.id })
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Object)
    expect(response.body).toBeTruthy()
    expect(response.body).toBeDefined()
  })
  test("All User's Projects , querys are missing", async () => {
    const response = await request(server)
      .get("/userRoute/getAllUsersProjects")
      .query({})
    expect(response.status).toBe(400)
    expect(response.text).toContain("creatorId is required")
  })
})

describe("Delete User", () => {
  test("User Delete should respond with a 200 status code", async () => {
    const response = await request(server).delete("/userRoute/delete").query({
      userId: newUser.id,
      userEmail: newUser.email
    })
    expect(response.status).toBe(200)
    expect(response.text).toContain("User Was Destroyed Successfully")
  })

  test("Delete User , querys are missing", async () => {
    const response = await request(server).delete("/userRoute/delete").query({})
    expect(response.status).toBe(404)
    expect(response.clientError).toBe(true)
    expect(response.text).toBe("Email and ID are required")
  })
})
