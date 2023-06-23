import { Router } from "express"
import {
  createOrder,
  reciveWebHook
} from "../controllers/payment/paymentController"
import getAllPaymentsFromOneUser from "../controllers/payment/getAllPaymentsFromOneUser"
import getPaymentById from "../controllers/payment/getPaymentById"
import getAllPaymentsFromOneProject from "../controllers/payment/getAllPaymentsFromOneProject"

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

//! ------------------
// All Payments from User/Project
router.get("/info/getAllPaymentsFromOneUser", getAllPaymentsFromOneUser) //!
router.get("/info/getAllPaymentsFromOneProject", getAllPaymentsFromOneProject) //!

// Todos los payments que tiene el project
router.get("/info/getPaymentById", getPaymentById)

export { router }
