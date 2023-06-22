import { Response, Request } from "express"
import mercadopago from "mercadopago"

export const createOrder = async (
  req: Request,
  res: Response
): Promise<object> => {
  mercadopago.configure({
    access_token:
      // token del vendedor 1
      "TEST-6906507892593651-061712-2b4875eb25700da93a4beb6f9edb70be-1400674523"
  })
  const { titleProject, unitePrice, currencyId, quantityNumber } = req.body
  try {
    const result = await mercadopago.preferences.create({
      // Genero un item para simular una venta luego hacerlo dinamico (1)
      // items: [
      //   {
      //     title: "Laptop Lenovo",
      //     unit_price: 500,
      //     currency_id: "ARS",
      //     quantity: 1
      //   }
      // ],
      items: [
        {
          title: titleProject,
          unit_price: unitePrice,
          currency_id: currencyId,
          quantity: quantityNumber
        }
      ],
      // Le indico hacia donde yo retorno la respuesta (2)
      back_urls: {
        success: "http://127.0.0.1:5173/paymentRoute/success", // si se realizo el pago me redirige ACA al tocar el boton VOLVER al sitio en la pagina de MP
        failure: "http://127.0.0.1:5173/paymentRoute/failure", // fallo
        pending: "http://127.0.0.1:5173/paymentRoute/pending" // pendiente
      },
      // Cuando el pago este echo, se envia a esta url, pero debe ser una transaccion segura https(en DEV no tenemos)
      // por ende use agrega "ngrok" se descarga un ejecutable que genera un tunnel HTTP, da un dominio SSL
      // y ese dominio va a redireccionar a su localhost, bajo archivo y agrego al proyecto en carpeta raiz
      // ejecuto en terminal   .\ngrok.exe http 3001    copiar la (http.... io)+/webhook a notification_url
      notification_url:
        "https://fed6-2800-810-538-16b9-14a0-2fcb-436e-eda6.sa.ngrok.io/paymentRoute/webhook"
      //! "https://9ce0-2800-810-538-16b9-14a0-2fcb-436e-eda6.sa.ngrok.io/paymentRoute/webhook"
    })
    // (3) envio la info gral la cual tiene un atributo,tipo url que recibe el usario para terminar el pago
    // es la url que ve el comprador 1 , EJ:
    // init_point: 'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1400674523-90c85025-16f5-4065-9673-b88a42b76f10',
    if (!result) throw new Error("Error with mercado pago")
    return res.status(200).json(result.body)
  } catch (error) {
    return res.status(500).json({ messageError: "Something went wrong" })
  }
}

export const reciveWebHook = async (req: Request, res: Response) => {
  /*
  (4) MP enviar 2 peiticiones post Secuenciadas
  console.log(req.query) es un objeto con toda la info
  Primera peticion que nos envia de MP 
  { id: '9960489771', topic: 'merchant_order' }
  POST /paymentRoute/webhook?id=9960489771&topic=merchant_order 200 7.059 ms - 8
  Segunda peticion que nos envia MP con el ID del pago 
  { 'data.id': '1313494274', type: 'payment' }
  POST /paymentRoute/webhook?data.id=1313494274&type=payment 200 2.222 ms - 8
  */
  const { type } = req.query
  if (type === "payment") {
    // const paymentId = data["data.id"] as string
    // console.log(paymentId)

    try {
      if (req.query["data.id"]) {
        const response = await mercadopago.payment.findById(
          +req.query["data.id"]
        )
        console.log(response.response)
      }
      // Aquí puedes manejar la información del pago recibido de Mercado Pago
    } catch (error) {
      res.status(500).send({ message: `${error}` })
    }
  }

  res.status(204).send("Transaction was successfully")
}
