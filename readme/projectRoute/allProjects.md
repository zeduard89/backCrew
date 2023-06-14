# Get all Projects

**URL** : `/projectRoute/allProject`

**Method** : `GET`

**Auth required** : YES

**Data constraints**

```json
{
  //Completar con los filtrados
}
```

**Data example**

```json

```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  //El objeto que filtra (varias logicas CHEQUEAR)
  "title": "titulo",
  "categori": "music",
  "likes": "likes",
  "disLikes": "disLikes",
  "founding": "founding"
}
```

## Error Response

**Condition** : If 'path route' is wrong.

**Code** : `404 BAD REQUEST`

**Content** :

```json
"Ruta no encontrada"
```

- [readme](../../readme.md) : `BackReadme`
