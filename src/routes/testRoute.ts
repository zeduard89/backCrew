import { Router } from "express"
import checkRoute from "../controllers/checkRoute"

const router = Router()

// router.post("/login", loginUser)

router.get("/checkRoute", checkRoute)

export { router }
