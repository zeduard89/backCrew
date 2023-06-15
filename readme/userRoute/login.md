# Login

Used to collect a Token for a registered User.

**URL** : `/userRoute/login/`

**Method** : `POST`

**Auth required** : NO

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
  "email": "john@example6.com",
  "password": "1234"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": {
    "id": "222b5b2f-19f5-4654-b2cd-67c69a2675bd",
    "name": "Johnn",
    "lastName": "Morel",
    "email": "john@example4.com",
    "verified": false,
    "access": true, //Devolver un token provisorio
    "password": "$2a$10$5BflE9ACvfWjRPZCxSYNiumrDi8k.gG81s1AnHg8JobdcyEe2msZe",
    "image": "false", //Corregir por url azure
    "createdAt": "2023-06-14T00:36:39.085Z", //no
    "updatedAt": "2023-06-14T04:59:38.239Z" //no
  }
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{ //Corregir detalles
  "non_field_errors": ["Unexpected token } in JSON at position 44."]
}
{
    WHERE parameter "email" has invalid "undefined" value
}
```

**Condition** : If 'username' not found

**Code**: `400 NOT FOUND`

```json
{
  "User not found"
}

```

- [Back](../../readme.md) : `MainPage`
