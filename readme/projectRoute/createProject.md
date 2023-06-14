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
  "fundingGoalReached": "[valid boolean]",
  "fundingDayLeft": "[valid number]",
  "categories": "[valid categories]",
  "image": "[valid image]", //Borrar
  "displayProject": "[valid boolean]" //a futurno no enviar al front
}
```

**Data example**

```json
{
  "title": "Usuario",
  "description": "Ese te un ejemplo de una descripcion",
  "shortDescription": "Esto es una descripcion corta",
  "fundingGoal": 10000,
  "fundingGoalReached": false,
  "fundingDayLeft": 30,
  "categories": ["Asi", "TeGUsta", "MAs?"],
  "image": "https://www.istockphoto.com/es/foto/un-gato-y-un-perro-yacen-juntos-en-la-cama-mascotas-durmiendo-en-un-acogedor-plaid-gm1385113345-444056757",
  "displayProject": true
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    "title": "Usuario",
    "id": 15,
    "description": "Ese te un ejemplo de una descripcion",
    "shortDescription": "Esto es una descripcion corta",
    "fundingGoal": 10000,
    "fundingGoalReached": false,
    "fundingCurrent": 0,
    "fundingPercentage": 0,
    "fundingDayLeft": 30,
    "categories": [
      "likes": 0,
      "disLikes": 0,
        "Asi",
        "TeGUsta",
        "MAs?"
    ],
    "image": "https://www.istockphoto.com/es/foto/un-gato-y-un-perro-yacen-juntos-en-la-cama-mascotas-durmiendo-en-un-acogedor-plaid-gm1385113345-444056757",
    "displayProject": true,
    "updatedAt": "2023-06-14T13:36:35.165Z",
    "createdAt": "2023-06-14T13:36:35.165Z"
}
```

## Error Response

**Condition** : If 'project' exist.

**Code** : `200 BAD REQUEST` ( CORREGIR, enviar 200 )

**Content** :

```json
{
  "errorMessage": "El Proyecto ya existe "
}
```

**Condition** : If 'atribute' not found

**Code**: `400 NOT FOUND`

```json
[
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "undefined",
    "path": ["fundingGoal"],
    "message": "Required"
  }
]
```

- [readme](../../readme.md) : `BackReadme`
