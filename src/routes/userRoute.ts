import { Router } from "express"
import multer from "multer"
import { loginUser } from "../controllers/user/postUserLogin"
import { registerUser } from "../controllers/user/postUserRegister"
import { deleteUser } from "../controllers/user/updateUserDelete"
import { uploadImageUser } from "../controllers/user/postUserImage"
import { getUserInfo } from "../controllers/user/getUserInfo"

const upload = multer()
const router = Router()

router.post("/login", loginUser)

router.post("/register", registerUser)

router.post("/uploadImage", upload.single("file"), uploadImageUser)

router.get("/user", getUserInfo)

router.put("/delete", deleteUser)

export { router }
