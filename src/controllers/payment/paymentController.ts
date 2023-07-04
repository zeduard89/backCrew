import { Response, Request } from "express"
import { PaymentsModel, ProjectModel, UserModel } from "../../config/db"
import { mainUser, mainProject } from "./emailNotificacionPayment"
import mercadopago from "mercadopago"
import dotenv from "dotenv"
dotenv.config()
// const { TOKEN_MP, MP_SUCCESS } = process.env
const { TOKEN_MP, MP_SUCCESS, MP_NOTIFICATION } = process.env // MP_NOTIFICATION

let user = ""
let project = ""
let title = ""

export const createOrder = async (
  req: Request,
  res: Response
): Promise<object> => {
  mercadopago.configure({
    access_token:
      // token del vendedor 1
      `${TOKEN_MP}`
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
  title = titleProject
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
        success: `${MP_SUCCESS}${projectId}`, // si se realizo el pago me redirige ACA al tocar el boton VOLVER al sitio en la pagina de MP
        failure: `${MP_SUCCESS}${projectId}`, // fallo
        pending: `${MP_SUCCESS}${projectId}` // pendiente
      },
      // Cuando el pago este echo, se envia a esta url, pero debe ser una transaccion segura https(en DEV no tenemos)
      // por ende use agrega "ngrok" se descarga un ejecutable que genera un tunnel HTTP, da un dominio SSL
      // y ese dominio va a redireccionar a su localhost, bajo archivo y agrego al proyecto en carpeta raiz
      // ejecuto en terminal   .\ngrok.exe http 3001    copiar la (http.... io)+/paymentRoute/webhook a notification_url
      // ./ngrok.exe http 3001 tambien probar con la barra invertida

      notification_url: `${MP_NOTIFICATION}/paymentRoute/webhook`

      //! "https://1f02-2800-810-538-16b9-2123-10a6-3eb0-4055.sa.ngrok.io/paymentRoute/webhook"
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

        const userFounded = await UserModel.findByPk(user)
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
          firstName:
            detail.payer.first_name || userFounded?.name || "firstName",
          lastName:
            detail.payer.last_name || userFounded?.lastName || "lastName",
          email: userFounded?.email || detail.payer.email,
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
        // Envio el email al donante
        mainUser(
          newDetail.email,
          newDetail.firstName,
          newDetail.id,
          title,
          newDetail.transactionAmount,
          newDetail.status
        )

        const upDateProject = await ProjectModel.findByPk(project)
        const userProject = await UserModel.findByPk(upDateProject?.creatorId)

        // Envio un email a dueño del proyecto
        if (!userProject) throw new Error("Id Project not found")
        mainProject(
          userProject.email,
          userProject.name,
          title,
          newDetail.transactionAmount,
          newDetail.status
        )
        // Actualizo el proyecto
        if (upDateProject) {
          // Actualizo el current Founding
          const updatedCurrentFounding =
            parseFloat(newDetail.transactionReceived) -
            parseFloat(newDetail.transactionAmountRefunded)
          // Actualizo el founding Percentaje
          const newFundingPercentage =
            ((upDateProject.fundingCurrent + updatedCurrentFounding) * 100) /
            upDateProject.fundingGoal
          // Compruebo si se supero el fundingGoal
          let goalTrue = false
          if (newFundingPercentage >= 100) goalTrue = true

          await upDateProject.update(
            {
              fundingCurrent:
                upDateProject.fundingCurrent + updatedCurrentFounding,
              fundingPercentage: newFundingPercentage,
              fundingGoalReached: goalTrue
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
