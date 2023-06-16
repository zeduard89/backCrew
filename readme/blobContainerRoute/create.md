# Create a Container

**URL** : `/blobContainerRoute/create/`

**Method** : `GET`

**Auth required** : YES

**Data constraints**

```json
{
  "container": "[validate string]"
}
```

**Data example**

```json
{
  "container": "crew1"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "El container: newvideo fue creado correctamente"
}
```

## Error Response

**Condition** : If "container" is missing.

**Code** : `500 BAD REQUEST`

**Content** :

```Not json (revisar)

"Por favor ingresar un valor de container valido"

```

**Condition** : If 'container' is !== cointainer

**Code**: `500 NOT FOUND`

```Not json (revisar)

Por favor ingresar un valor de container valido

```

- [Back](../../readme.md) : `MainPage`
