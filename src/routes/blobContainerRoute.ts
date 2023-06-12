import { Router } from "express"
import {
  createContainer,
  listContainer,
  deleteContainer
} from "../controllers/azure/containerController"

const router = Router()

router.post("/create", createContainer)
router.get("/containers", listContainer)
router.delete("/delete", deleteContainer)

export { router }
