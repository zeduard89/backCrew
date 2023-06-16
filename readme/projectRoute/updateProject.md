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
  "category": "[valid strings]"
}
```

**Data example**

```json
{
  "id": 1,
  "title": "ProjectX",
  "description": "This is an example of a description.",
  "shortDescription": "This is a short description.",
  "fundingGoal": 100000,
  "fundingDayLeft": 10000,
  "category": "category"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Successful update of the project with ID: 1"
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
    "path": ["fundingDayLeft"],
    "message": "Required"
  }
]
```

**Condition** : If 'username' exist in DB

**Code**: `200 NOT FOUND` //CORREGIR

```json
{
  "errorMessage": "The title already exists"
}
```

- [Back](../../readme.md) : `MainPage`
