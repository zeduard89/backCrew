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
  "title": "ProjectX",
  "likes": 100,
  "disLikes": 0
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Successfully modified the values of likes: 200 and dislikes: 0"
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
    "path": ["likes"],
    "message": "Required"
  }
]
```

**Condition** : If 'project' not found in DB

**Code**: `400 NOT FOUND`

```json
{
  "message": "Successfully modified the values of likes: 300 and dislikes: 0"
}
```

- [Back](../../readme.md) : `MainPage`
