# Delete User

**URL** : `/userRoute/delete/`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
{
  "email": "[valid email address]",
  "password": "[password in plain text]"
}
```

**Data example**

```json
{
  "email": "john@example1.com",
  "password": "1234"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": {
    "id": "72c93b18-123e-4ae6-a9d9-eaa7c9b9589e", //no
    "name": "Johnn", //no
    "lastName": "Morel", //no
    "email": "john@example1.com", //no
    "verified": false, //no
    "access": true, // token provisorio
    "password": "$2a$10$TsmMfiO/OOzrNmPQovAqfuHs6R2Nvm0lEkBFoCF0ignPTmASQTaK.", //no
    "image": "false", //no
    "createdAt": "2023-06-14T00:27:34.968Z", //no
    "updatedAt": "2023-06-14T00:29:23.415Z" //no
  }
}
```

## Error Response

**Condition** : If 'email' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  //Corregir detalles
  "error": ["Escribi bien chango."]
}
```

- [Back](../../readme.md) : `MainPage`
