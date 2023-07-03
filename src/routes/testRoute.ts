import { Router } from "express"
import checkRoute from "../controllers/testDev/checkRoute"
import fillDb from "../controllers/testDev/fillDb"
import getImages from "../controllers/testDev/getImages"
import updateImages from "../controllers/testDev/updateImage"
import deleteSingleImage from "../controllers/testDev/deleteSingleImage"

const router = Router()

// router.post("/login", loginUser)

router.get("/checkRoute", checkRoute)

// llena la db con la info relacionada
router.post("/fillDb", fillDb)

// trae las imagenes de la db
router.get("/getImages", getImages)

// Actualiza la db, las imagenes del proyecto (SOLO LAS HARCODEADA, tiene harcodeado :"crew" en la url de peticion)
router.put("/updateImages", updateImages)

router.delete("/deleteImages", deleteSingleImage)

export { router }
