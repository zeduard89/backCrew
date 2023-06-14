# Image User of profile

**URL** : `/userRoute/login/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
  "file": "[valid file]",
  "email": "[valid email]"
}
```

**Data example**

```json
{
  "imag": "006.jpg", //fix
  "email": "john@example.com"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  //lo que deberia ser
  "message": "image upload" //fix
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  //Corregir detalles
  "file_errors": ["Unexpected format }"]
}
```

- [Back](../../readme.md) : `MainPage`
