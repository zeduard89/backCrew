# Update CurrentFounding

**URL** : `/projectRoute/update/addToFundingCurrent`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
{
  "title": "[valid string]",
  "addToFundingCurrent": "[valid number]"
}
```

**Data example**

```json
{
  "title": "ProjectX",
  "addToFundingCurrent": 100000
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Se modifico Correctamente el valor de fundingCurrent y fundingPercentage"
}
```

## Error Response

**Condition** : If 'title' don't exist.

**Code** : `400 BAD REQUEST`

**Content** :

```json
[
  {
    "errorMessage": "Project does not exist"
  }
]
```

**Condition** : If 'title' and 'addFoundingCurrent' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
[
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "string",
    "path": ["addToFundingCurrent"],
    "message": "Expected number, received string"
  }
]
```

**Condition** : If parameter not found

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

- [Back](../../readme.md) : `MainPage`
