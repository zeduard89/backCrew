# Deposite blob

**URL** : `/blobRoute/create`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
  "file": "[valid FILE]",
  "container": "[valid string]",
  "name": "[valid string]"
}
```

**Data example**

```json
{
  "file": "ejmplo@gmail.com",
  "container": "crew1",
  "name": "carrusel"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "El elemento: cesar fue creado Exitosamente"
}
```

## Error Response

**Condition** : If 'container' and 'name' or 'file' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```Not json //Corregir detalles

Datos del contendor/name incompletos

```

**Condition** : If 'container' not found

**Code**: `400 NOT FOUND`

```Not json

No existe el container imag

```

- [Back](../../readme.md) : `MainPage`
