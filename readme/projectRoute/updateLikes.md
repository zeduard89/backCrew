# Update Likes

**URL** : `/projectRoute/update/likes`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
{
  "title": "[valid string]",
  "likes": "[valid number positive integer]",
  "disLikes": "[valid number positive integer]"
}
```

**Data example**

```json
{
  "title": "string",
  "likes": 100,
  "disLikes": 0
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Se modifico Correctamente el valor de likes: 100 y disLikes: 0"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong/missing.

**Code** : `400 BAD REQUEST`

**Content** :

```json
[
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "undefined",
    "path": ["disLikes"],
    "message": "Required"
  }
]
```

**Condition** : If 'project' not found in DB

**Code**: `400 NOT FOUND`

```json
{
  "errorMessage": "El Project no existe"
}
```

- [Back](../../readme.md) : `MainPage`
