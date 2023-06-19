import { Router } from "express"
import multer from "multer"
// import { loginUser } from "../controllers/user/postUserLogin"
import { registerUser } from "../controllers/user/postUserRegister"
import { updateUserInfo } from "../controllers/user/updateUserInfo"
import { getUserInfo } from "../controllers/user/getUserInfo"
import getAllUsers from "../controllers/user/getAllUsers"
import getAllUserProjects from "../controllers/user/getAllUserProjects"

const upload = multer()
const router = Router()

// router.post("/login", loginUser)

router.post("/register", registerUser)

router.get("/userDetails", getUserInfo)

router.get("/getAllUsers", getAllUsers)

router.get("/getAllUsersProjects", getAllUserProjects)

router.put("/updateUserInfo", upload.single("file"), updateUserInfo)

export { router }
