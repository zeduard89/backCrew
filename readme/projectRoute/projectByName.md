# Get Project By Name

**URL** : `/projectRoute/search/byName/?name=string`

**Method** : `GET`

**Auth required** : YES

**Data Query**

      "name": "[valid string]"

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
  "id": 1,
  "title": "ProjectX",
  "description": "This is an example of a description.",
  "shortDescription": "This is a short description.",
  "fundingCurrent": 0,
  "fundingGoal": 2000,
  "fundingGoalReached": false,
  "fundingPercentage": 0,
  "fundingDayLeft": 30,
  "likes": 100,
  "disLikes": 0,
  "category": "Tech & Innovation",
  "bank": null,
  "account": "false",
  "location": "Argentina",
  "projectFase": 0
}
```

## Error Response

**Condition** :If the letter is found in any title of the database.

**Code** : `200 BAD REQUEST` //CORREGIR 200

**Content** :

```Array
[
    "Proyecto 2",
    "Proyecto 3",
    "Proyecto 4",
    "Proyecto 5",
    ...
]
```

**Condition** : If 'name' don't exist.

**Code** : `200 BAD REQUEST` //CORREGIR 200

**Content** :

```json
{
  "errorMessage": "Project does not exist"
}
```

**Condition** : The Query parameter was misspelled

**Code**: `400 NOT FOUND`

```json
[
  {
    "code": "invalid_type",
    "expected": "string",
    "received": "undefined",
    "path": [],
    "message": "Required"
  }
]
```

- [Back](../../readme.md) : `MainPage`
