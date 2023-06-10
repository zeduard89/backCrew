// import { Request, Response, Router } from 'express'
import { Router } from "express"
import { loginUser, registerUser } from "../controllers/user/User"

const router = Router()

router.post("/login", loginUser)

router.post("/register", registerUser)

export { router }
