# Deposite blob

**URL** : `/blobRoute/create`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
  "container": "[valid string]",
  "name": "[valid string]",
  "file": "[valid FILE]"
}
```

**Data example**

```json
{
  "container": "crew1",
  "name": "CarruselAuto1",
  "file": "auto1.jpg"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

// The file is storage with the extension of the orignal name of the image

```json
{
  "message": "El elemento: CarruselAuto1.jpg fue creado Exitosamente"
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
