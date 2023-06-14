# Get Day Left Project

**URL** : `/projectRoute/search/dayLeft`

**Method** : `GET`

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
  "data": {
    "id": "222b5b2f-19f5-4654-b2cd-67c69a2675bd",
    "name": "Johnn",
    "lastName": "Morel"
  }
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  //lo que deberia ser
  "token": "93144b288eb1fdccbe46d6fc0f241a51766ecd3d"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  //Corregir detalles
  "non_field_errors": ["Unexpected token } in JSON at position 44."]
}
```

**Condition** : If 'username' not found

**Code**: `400 NOT FOUND`

```json
{
  "User not found"
}

```

- [readme](../../readme.md) : `BackReadme`
