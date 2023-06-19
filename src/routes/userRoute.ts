import { Router } from "express"
// import { loginUser } from "../controllers/user/postUserLogin"
import { registerUser } from "../controllers/user/postUserRegister"
// import { deleteUser } from "../controllers/user/updateUserDelete"
import { getUserInfo } from "../controllers/user/getUserInfo"
import getAllUsers from "../controllers/user/getAllUsers"
import getAllUserProjects from "../controllers/user/getAllUserProjects"

const router = Router()

// router.post("/login", loginUser)

router.post("/register", registerUser)

router.get("/user", getUserInfo)

router.get("/getAllUsers", getAllUsers)

router.get("/getAllUsersProjects", getAllUserProjects)

// router.put("/delete", deleteUser)

export { router }
