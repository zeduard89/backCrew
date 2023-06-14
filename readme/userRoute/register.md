# Register

**URL** : `/userRoute/register/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
  "name": "[valid email name]",
  "lastName": "[valid email lastName]",
  "email": "[valid email email]",
  "password": "[valid email password]",
  "access": false //no debe salir del front
}
```

**Data example**

```json
{
  "data": {
    "name": "Johnn",
    "lastName": "Morel",
    "email": "john@example5.com",
    "password": "1234",
    "access": false
  }
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "registerUser": {
    "id": "2ecd08e3-2422-4741-8287-15e407f424f1",
    "verified": false,
    "image": "false", //que sea URL de azure
    "name": "Johnn",
    "lastName": "Morel",
    "email": "john@example6.com",
    "password": "$2a$10$npIx7QBDWvjKdJNDv8yAueIVefRTPZmn/5hiDbaYPWKLo33Jg8R7G", //luego hacerlo temporal
    "access": false, //quitar
    "updatedAt": "2023-06-14T05:25:38.953Z", //quitar
    "createdAt": "2023-06-14T05:25:38.953Z" // quitar
  }
}
```

## Error Response

**Condition** : If 'email' don't exist .

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  //Corregir detalles
  "Illegal arguments": "undefined, number"
}
```

- [readme](../../readme.md) : `BackReadme`
