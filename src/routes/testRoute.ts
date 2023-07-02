import { Router } from "express"
import checkRoute from "../controllers/testDev/checkRoute"
import fillDb from "../controllers/testDev/fillDb"
import getImages from "../controllers/testDev/getImages"

const router = Router()

// router.post("/login", loginUser)

router.get("/checkRoute", checkRoute)

router.post("/fillDb", fillDb)

router.get("/getImages", getImages)

export { router }
