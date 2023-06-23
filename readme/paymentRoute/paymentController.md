### Mercado Pago Configuration (Front-Back)

## FRONT

```javascript
const Payment Form = () => {
  const handlePayment = async () => {
    try {
      const items = {
        userId: "123456",
        projectId: "ee235f93-4d02-44c0-bc4f-5b5f988d4dc1",
        titleProject: "Laptop Lenovo",
        unitePrice: 500,
        currencyId: "ARS",
        quantityNumber: 1
      }

      // SDK method create a payment reference. It return an object
      const response = await fetch("/paymentRoute/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(items)
      })
      const data = await response.json()

      // I redirect to the PM payment page
      window.location.href = data.init_point
    } catch (error) {
      console.error("Error processing payme:", error)
    }
  }

  return (
    <div>
      <h2>Payment Form</h2>
      <button onClick={handlePayment}>Realizar Pago</button>
    </div>
  )
}

export default Payment Forms
```

# Dependencies

```json

  "dependencies": {
    "@mercadopago/sdk-react": "^0.0.11",
  },

```

## BACK (First Step)

**URL** : `paymentRoute/info/create-order`

**Method** : `POST`

**Body** :
{
titleProject,
unitePrice,
currencyId,
quantityNumber,
userId,
projectId
}

**Auth required** : YES

**Configuration required** : YES

```javascript
const result = await mercadopago.preferences.create({
      items: [
        {
          title: titleProject,
          unit_price: unitePrice,
          currency_id: currencyId,
          quantity: quantityNumber
        }
      ],
mercadopago.configure({
  access_token:
    // Crew token of MP
    "TEST-6906507892593651-061712-2b4875eb25700da93a4beb6f9edb70be-1400674523"
})
Rest Of Code Here
})
```

```javascript
back_urls: {
        success: "http://127.0.0.1:5173/paymentRoute/success", // Successful
        failure: "http://127.0.0.1:5173/paymentRoute/failure", // Failed
        pending: "http://127.0.0.1:5173/paymentRoute/pending" // Pending
      }
```

When the payment is made, it is sent to this url, but it must be a secure https transaction -in DEV we don't have it- so use adds "ngrok" downloads an executable that generates an HTTP tunnel, gives an SSL domain and that domain will redirect to your localhost, under file and add to the project in root folder
run in terminal this code: (.\ngrok.exe http 3001) and change your http://localhost:3001

```javascript
notification_url: "https://d995-2800-810-538-16b9-c9f2-4c4c-ad9d-ff33.sa.ngrok.io/paymentRoute/webhook"
```

## BACK (Second Step)

Use 'MercadoPago.payment.findById(req.query['data.id])' to find the payment Information, then use this information save in DB and update the information of the project.

```javascript
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
```

**Data example**

```json
{
  "id": 1315913361,
  "payerId": "1401306784",
  "currencyId": "ARS",
  "description": "Laptop Lenovo",
  "operationType": "regular_payment",
  "orderId": "9983884295",
  "ordertype": "mercadopago",
  "firstName": "firstName",
  "lastName": "lastName",
  "email": "test_user_80507629@testuser.com",
  "identificationNumber": "32659430",
  "identificationType": "DNI",
  "phoneAreaCode": "phoneAreaCode",
  "phoneNumber": "phoneNumber",
  "phoneExtension": "phoneExtension",
  "type": "type",
  "entityType": "entityType",
  "paymentMetodId": "master",
  "status": "approved",
  "statusDetail": "accredited",
  "taxesAmount": 0,
  "transactionAmount": 500,
  "transactionAmountRefunded": 0,
  "transactionReceived": 479.5,
  "dateApproved": "2023-06-22T14:40:21.443-04:00",
  "dateCreated": "2023-06-22T14:40:21.318-04:00",
  "userId": "123456",
  "projectId": "ee235f93-4d02-44c0-bc4f-5b5f988d4dc1"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Paymente is ${newDetail.id} and ${newDetail.payerId}"
}
```

## Error Response

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "message": "Error getting all project Payments"
}
```

- [Back](../../readme.md) : `MainPage`
