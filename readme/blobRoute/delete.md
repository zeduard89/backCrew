# Delete Container

**URL** : `/blobRoute/delete`

**Method** : `DELETE`

**Auth required** : YES

**Data constraints**

```json
{
  "container": "[validate String]",
  "filename": "[validate string]"
}
```

**Data example**

```json
{
  "container": "images",
  "filename": "cesarPhoto"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Se borro con exito el archivo cesarPhoto"
}
```

## Error Response

**Condition** : If 'container' and 'filename' are wrong/missing.

**Code** : `400 BAD REQUEST`

**Content** :

```json //Corregir detalles

No existe el elmento: undefined

```

**Condition** : If 'filename' not found

**Code**: `400 NOT FOUND`

```Not json

No se encuentra el archivo cesar en el deposito

```

- [Back](../../readme.md) : `MainPage`
