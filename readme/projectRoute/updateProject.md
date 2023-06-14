# Update Project

**URL** : `/projectRoute/update`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
{
  "id": "[valid id]",
  "title": "[valid string]",
  "description": "[valid description]",
  "shortDescription": "[valid short description]",
  "fundingGoal": "[valid number]",
  "fundingDayLeft": "[valid number]",
  "categories": "[valid array of strings]"
}
```

**Data example**

```json
{
  "id": 1,
  "title": "ProjectX",
  "description": "Ese te un ejemplo de un texto que deberia ser muy largo",
  "shortDescription": "Este es un ejemplo corto",
  "fundingGoal": 100000,
  "fundingDayLeft": 10000,
  "categories": ["movies", "music", "healt"]
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Cambio exitoso del projecto con ID: 1"
}
```

## Error Response

**Condition** : If atribute or combination of atributes are missing.

**Code** : `400 BAD REQUEST`

**Content** :

```json
[
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "undefined",
    "path": ["id"],
    "message": "Required"
  }
]
```

**Condition** : If 'username' exist in DB

**Code**: `200 NOT FOUND` //CORREGIR

```json
{
  "errorMessage": "El titulo ya existe"
}
```

- [readme](../../readme.md) : `BackReadme`
