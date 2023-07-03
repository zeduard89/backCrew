import { Router } from "express"
import checkRoute from "../controllers/testDev/checkRoute"
import fillDb from "../controllers/testDev/fillDb"

const router = Router()

// router.post("/login", loginUser)

router.get("/checkRoute", checkRoute)

router.post("/fillDb", fillDb)

export { router }
