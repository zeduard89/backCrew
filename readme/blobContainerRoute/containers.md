# Get All a Container

**URL** : `/blobContainerRoute/containers/`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  {
    "containers": [
        "azureusercontainer",
        "crew1",
        "crew2",
        "crew3",
        "crew4",
        "crew5",
    ]
}
}
```

## Error Response

**Condition** : If 'containers' is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json //  Corregir detalles
{
  "errors": "Unexpected"
}
```

- [Back](../../readme.md) : `MainPage`
