import { Router } from "express"
import {
  createOrder,
  reciveWebHook
} from "../controllers/payment/paymentController"

const router = Router()

// Generar un orden de compra
router.post("/create-order", createOrder)

// Cuando el usuario acepta el pago
router.get("/success", (_req, res) => {
  res.send("creating order")
})

// Al completarse un pago, puede demorar por lo cual realizo otra peticion por confirmacion
router.get("/failure", (_req, res) => {
  res.send("failure")
})

router.get("/pending", (_req, res) => {
  res.send("pending")
})

// Escucha eventos que lleguen por mecado pago(usuario esta pagando/ya pago)
router.post("/webhook", reciveWebHook)

export { router }
