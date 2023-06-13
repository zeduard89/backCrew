import { Router } from "express"
import { loginUser } from "../controllers/user/postUserLogin"
import { registerUser } from "../controllers/user/postUserRegister"
import { deleteUser } from "../controllers/user/updateUserDelete"

const router = Router()

router.post("/login", loginUser)

router.post("/register", registerUser)

router.put("/delete", deleteUser)

export { router }
