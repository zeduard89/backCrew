"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reciveWebHook = exports.createOrder = void 0;
const mercadopago_1 = __importDefault(require("mercadopago"));
const createOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    mercadopago_1.default.configure({
        access_token: 
        // token del vendedor 1
        "TEST-6906507892593651-061712-2b4875eb25700da93a4beb6f9edb70be-1400674523"
    });
    try {
        const result = yield mercadopago_1.default.preferences.create({
            // Genero un item para simular una venta luego hacerlo dinamico (1)
            items: [
                {
                    title: "Laptop Lenovo",
                    unit_price: 500,
                    currency_id: "ARS",
                    quantity: 1
                }
            ],
            // Le indico hacia donde yo retorno la respuesta (2)
            back_urls: {
                success: "http://localhost:3001/paymentRoute/success",
                failure: "http://localhost:3001/paymentRoute/failure",
                pending: "http://localhost:3001/paymentRoute/pending" // pendiente
            },
            // Cuando el pago este echo, se envia a esta url, pero debe ser una transaccion segura https(en DEV no tenemos)
            // por ende use agrega "ngrok" se descarga un ejecutable que genera un tunnel HTTP, da un dominio SSL
            // y ese dominio va a redireccionar a su localhost, bajo archivo y agrego al proyecto en carpeta raiz
            // ejecuto en terminal   .\ngrok.exe http 3001    copiar la (http.... io)+/webhook a notification_url
            notification_url: "https://ef62-2800-810-538-16b9-58ec-87c7-f19b-773d.sa.ngrok.io/paymentRoute/webhook"
        });
        // (3) envio la info gral la cual tiene un atributo,tipo url que recibe el usario para terminar el pago
        // es la url que ve el comprador 1 , EJ:
        // init_point: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1400674523-90c85025-16f5-4065-9673-b88a42b76f10',
        console.log(result);
        if (!result)
            throw new Error("Error with mercado pago");
        return res.status(200).json(result.body);
    }
    catch (error) {
        return res.status(500).json({ messageError: "Something went wrong" });
    }
});
exports.createOrder = createOrder;
const reciveWebHook = (req, res) => {
    // (4) req query por que de la DB de MP te envia el id de la transaccion y el payment
    console.log("hola");
    console.log(req.query);
    res.status(200).send("perfecto");
};
exports.reciveWebHook = reciveWebHook;
//# sourceMappingURL=paymentController.js.map