# Delete Project

**URL** : `/projectRoute/deleteProject`

**Method** : `DELETE`

**Auth required** : YES

**Data constraints**

```json
{
  "title": "[valid title]",
  "displayProject": "[valid boolean]"
}
```

**Data example**

```json
{
  "title": "ProjectoX",
  "displayProject": false
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Successful displayProject change: true"
}
```

## Error Response

**Condition** : If 'title' in DB don't exist.

**Code** : `200 BAD REQUEST` //CORREGIR

**Content** :

```json
{
  "errorMessage": "Project not found"
}
```

**Condition** : If 'title' parameter don't exist

**Code**: `400 NOT FOUND`

```json
[
  {
    "code": "invalid_type",
    "expected": "string",
    "received": "undefined",
    "path": ["title"],
    "message": "Required"
  }
]
```

**Condition** : If 'displayProject' parameter don't exist

**Code**: `400 NOT FOUND`

```json
[
  {
    "code": "invalid_type",
    "expected": "boolean",
    "received": "undefined",
    "path": ["displayProject"],
    "message": "Required"
  }
]
```

- [Back](../../readme.md) : `MainPage`
