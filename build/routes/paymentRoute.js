"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const paymentController_1 = require("../controllers/payment/paymentController");
const router = (0, express_1.Router)();
exports.router = router;
// Generar un orden de compra
router.post("/create-order", paymentController_1.createOrder);
// Cuando el usuario acepta el pago
router.get("/success", (_req, res) => {
    res.send("creating order");
});
// Al completarse un pago, puede demorar por lo cual realizo otra peticion por confirmacion
router.get("/failure", (_req, res) => {
    res.send("failure");
});
router.get("/pending", (_req, res) => {
    res.send("pending");
});
// Escucha eventos que lleguen por mecado pago(usuario esta pagando/ya pago)
router.get("/webhook", paymentController_1.reciveWebHook);
//# sourceMappingURL=paymentRoute.js.map