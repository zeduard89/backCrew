# Get Project By Name

**URL** : `/projectRoute/search/byName/?name=string`

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
  "id": 1,
  "title": "ProjectX",
  "description": "Ese te un ejemplo de una descripcion larga y extensa",
  "shortDescription": "Esto es una short description",
  "fundingCurrent": 0,
  "fundingGoal": 2000,
  "fundingGoalReached": false,
  "fundingPercentage": 0,
  "fundingDayLeft": 30,
  "likes": 0,
  "disLikes": 0,
  "categories": ["Asi", "TeGUsta", "MAs?"],
  "image": "https://www.istockphoto.com/es/foto/un-gato-y-un-perro-yacen-juntos-en-la-cama-mascotas-durmiendo-en-un-acogedor-plaid-gm1385113345-444056757",
  "displayProject": true,
  "createdAt": "2023-06-11T21:46:20.445Z",
  "updatedAt": "2023-06-14T14:48:02.124Z"
}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `200 BAD REQUEST` //CORREGIR 200

**Content** :

```json
{
  //Corregir detalles
  "errorMessage": "Project no existe"
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

- [Back](../../readme.md) : `MainPage`
