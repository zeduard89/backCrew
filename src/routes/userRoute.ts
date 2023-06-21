import { Router } from "express"
import multer from "multer"
// import { loginUser } from "../controllers/user/postUserLogin"
import { registerUser } from "../controllers/user/postUserRegister"
import { updateUserInfo } from "../controllers/user/updateUserInfo"
import { getUserInfo } from "../controllers/user/getUserInfo"
import getAllUsers from "../controllers/user/getAllUsers"
import getAllUserProjects from "../controllers/user/getAllUserProjects"
import { postUserFavoriteRelationship } from "../controllers/user/postUserFavorite"
import getAllUsersFavorites from "../controllers/user/getAllUsersFavorites"
import { deleteUserFavorite } from "../controllers/user/deleteUserFavorite"

const upload = multer()
const router = Router()

// router.post("/login", loginUser)

router.post("/register", registerUser)

router.get("/userDetails", getUserInfo)

router.get("/getAllUsers", getAllUsers)

router.get("/getAllUsersProjects", getAllUserProjects)

router.put("/updateUserInfo", upload.single("file"), updateUserInfo)

router.post("/create/UserFavoriteRelationship", postUserFavoriteRelationship)

router.get("/getAllUsersFavorites", getAllUsersFavorites)

router.delete("/deleteUserFavorite", deleteUserFavorite)

export { router }
