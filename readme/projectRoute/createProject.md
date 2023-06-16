# Create Project

**URL** : `/projectRoute/`

**Method** : `POST`

**Auth required** : YES

**Data constraints**

```json
{
  "title": "[valid title]",
  "description": "[valid description]",
  "shortDescription": "[valid short description]",
  "fundingGoal": "[valid number]",
  "fundingDayLeft": "[valid number]",
  "category": "[valid string]"
}
```

**Data example**

```json
{
  "title": "ProjectX",
  "description": "Here an Example of a Describe Project",
  "shortDescription": "Here an Example of a Describe Project",
  "fundingGoal": 2000,
  "fundingDayLeft": 30,
  "category": "Tech & Innovation"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Project: ProjectX created successfully"
}
```

## Error Response

**Condition** : If 'project' exist.

**Code** : `200 BAD REQUEST` ( CORREGIR, enviar 200 )

**Content** :

```json
{
  "errorMessage": "Project exists"
}
```

**Condition** : If 'atribute' in json not found

**Code**: `400 NOT FOUND`

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

- [Back](../../readme.md) : `MainPage`
