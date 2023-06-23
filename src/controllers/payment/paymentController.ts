import { Response, Request } from "express"
import { PaymentsModel, ProjectModel } from "../../config/db"
import mercadopago from "mercadopago"
let user = ""
let project = ""

export const createOrder = async (
  req: Request,
  res: Response
): Promise<object> => {
  mercadopago.configure({
    access_token:
      // token del vendedor 1
      "TEST-6906507892593651-061712-2b4875eb25700da93a4beb6f9edb70be-1400674523"
  })
  const {
    titleProject,
    unitePrice,
    currencyId,
    quantityNumber,
    userId,
    projectId
  } = req.body
  // Guardo user y project en la variables globales
  user = userId
  project = projectId
  try {
    const result = await mercadopago.preferences.create({
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
        "https://e9af-2800-810-538-16b9-c9f2-4c4c-ad9d-ff33.sa.ngrok.io/paymentRoute/webhook"
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
    try {
      if (req.query["data.id"]) {
        // mercadopagoResponse{ body,response} objeto del payment
        const paymentDetail = await mercadopago.payment.findById(
          +req.query["data.id"]
        )
        const detail = paymentDetail.response
        // Aquí puedes manejar la información del pago recibido de Mercado Pago
        const newDetail = {
          id: detail.id,
          payerId: detail.payer.id,
          currencyId: detail.currency_id,
          description: detail.description,
          operationType: detail.operation_type,
          orderId: detail.order.id,
          ordertype: detail.order.type,
          firstName: detail.payer.first_name || "firstName",
          lastName: detail.payer.last_name || "lastName",
          email: detail.payer.email,
          identificationNumber: detail.payer.identification.number,
          identificationType: detail.payer.identification.type,
          phoneAreaCode: detail.payer.phone.area_code || "phoneAreaCode",
          phoneNumber: detail.payer.phone.number || "phoneNumber",
          phoneExtension: detail.payer.phone.extension || "phoneExtension",
          type: detail.payer.type || "type",
          entityType: detail.payer.entity_type || "entityType",
          paymentMetodId: detail.payment_method_id,
          status: detail.status,
          statusDetail: detail.status_detail,
          taxesAmount: detail.taxes_amount,
          transactionAmount: detail.transaction_amount,
          transactionAmountRefunded: detail.transaction_amount_refunded,
          transactionReceived: detail.transaction_details.net_received_amount,
          dateApproved: detail.date_approved.toString(),
          dateCreated: detail.date_created.toString(),
          userId: user.toString(),
          projectId: project.toString()
        }
        // Creo el paymente en la DB
        await PaymentsModel.create(newDetail)

        const upDateProject = await ProjectModel.findByPk(project)
        if (upDateProject) {
          const updatedCurrentFounding =
            parseFloat(newDetail.transactionReceived) -
            parseFloat(newDetail.transactionAmountRefunded)

          await upDateProject.update(
            {
              fundingCurrent:
                upDateProject.fundingCurrent + updatedCurrentFounding,
              fundingPercentage:
                ((upDateProject.fundingCurrent + updatedCurrentFounding) *
                  100) /
                upDateProject.fundingGoal
            },
            {
              where: {
                id: project
              }
            }
          )
        }

        res.status(200).json({
          message: `Paymente is ${newDetail.id} and ${newDetail.payerId}`
        })
      }
    } catch (error) {
      res.status(400).send({ message: `${error}` })
    }
  }
}
