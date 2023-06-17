import { Router } from "express"
import { registerUser } from "../controllers/user/postUserRegister"

const router = Router()

router.post("/register", registerUser)

export { router }
