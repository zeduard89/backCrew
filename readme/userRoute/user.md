# user

**URL** : `/userRoute/user/`

**Method** : `GET`

**Auth required** : YES

**Data constraints**

```json
{
  "email": "[valid email address]"
}
```

**Data example**

```json
{
  "email": "john@example4.com"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "user": {
    "id": "222b5b2f-19f5-4654-b2cd-67c69a2675bd",
    "name": "Johnn",
    "lastName": "Morel",
    "email": "john@example4.com",
    "verified": false,
    "access": true,
    "password": "$2a$10$5BflE9ACvfWjRPZCxSYNiumrDi8k.gG81s1AnHg8JobdcyEe2msZe",
    "image": "false",
    "createdAt": "2023-06-14T00:36:39.085Z",
    "updatedAt": "2023-06-14T00:37:01.339Z"
  }
}
```

## Error Response

**Condition** : If ' not exist email'.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  //Corregir detalles
}
```

- [Back](../../readme.md) : `MainPage`
