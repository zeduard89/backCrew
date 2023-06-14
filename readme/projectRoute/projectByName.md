# Get Project By Name

**URL** : `/projectRoute/search/daysleft/?name=string`

**Method** : `GET`

**Auth required** : YES

**Data constraints**

```json
{
  "name": "[valid name]"
}
```

**Data example**

```json
{
  "name": "ProjectoX"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "year": 2023,
  "month": 7,
  "day": 11,
  "hours": 18,
  "minutes": 46,
  "seconds": 20,
  "daysLeft": 28
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `200 BAD REQUEST` //CORREGIR 200

**Content** :

```json
{
  //Corregir detalles
  "errorMessage": ["Project no existe"
}
```

**Condition** : The Query parameter was misspelled

**Code**: `400 NOT FOUND`

```json
[
  {
    //Corregir
    "code": "invalid_type",
    "expected": "string",
    "received": "undefined",
    "path": [],
    "message": "Required"
  }
]
```

- [readme](../../readme.md) : `BackReadme`
