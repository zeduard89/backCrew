# Get All Payments From One Project

**URL** : `paymentRoute/info/getPaymentById?paymentId=1315913361`

**Method** : `GET`

**Auth required** : YES

**Data Query**

    "paymentId": "[valid string]"

**Data example**

```json
{
  "paymentId": "1315913361"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "id": 1315909711,
  "payerId": "1401306784",
  "currencyId": "ARS",
  "description": "Laptop Lenovo",
  "operationType": "regular_payment",
  "orderId": "9983841713",
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
  "paymentMetodId": "account_money",
  "status": "approved",
  "statusDetail": "accredited",
  "taxesAmount": 0,
  "transactionAmount": 500,
  "transactionAmountRefunded": 0,
  "transactionReceived": 479.5,
  "dateApproved": "2023-06-22T14:37:53.553-04:00",
  "dateCreated": "2023-06-22T14:37:53.520-04:00",
  "userId": "123456",
  "projectId": "ee235f93-4d02-44c0-bc4f-5b5f988d4dc1"
}
```

## Error Response

**Condition** :The Query parameter was misspelled.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "message": "Error getting Payment By Id"
}
```

**Condition** : If 'userId' don't exist in DB.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "message": "Error getting Payment By Id"
}
```

- [Back](../../readme.md) : `MainPage`
