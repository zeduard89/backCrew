# Delete Container

**URL** : `/blobContainerRoute/delete`

**Method** : `DELETE`

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
  "email": "john@example6.com",
  "password": "1234"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json //Corregir detalles
{
  "non_field_errors": "Unexpected token: in JSON at position 44."
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
