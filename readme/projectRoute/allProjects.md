# Get all Projects

**URL** : `/projectRoute/allProject`

**Method** : `GET`

**Auth required** : YES

**Data constraints**

```json
{
  //Completar con los filtrados
  "title": "titulo",
  "categori": "music",
  "likes": "likes",
  "disLikes": "disLikes",
  "founding": "founding"
}
```

**Data example**

```json
{
  // Completar con los filtrados
  "title": "titulo",
  "categori": "music",
  "likes": "likes",
  "disLikes": "disLikes",
  "founding": "founding"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  //Ejemplo ARRAY de objetos
  {
    "id": 1,
    "title": "ProjectX",
    "description": "Ese te un ejemplo de una descripcion muy larga y extensa",
    "shortDescription": "Esto es una short description como la lora",
    "fundingCurrent": 0,
    "fundingGoal": 2000,
    "fundingGoalReached": false,
    "fundingPercentage": 0,
    "fundingDayLeft": 30,
    "likes": 0,
    "disLikes": 0,
    "categories": [
      "Asi",
      "TeGUsta",
      "MAs?"
    ],
    "image": "https://www.istockphoto.com/es/foto/un-gato-y-un-perro-yacen-juntos-en-la-cama-mascotas-durmiendo-en-un-acogedor-plaid-gm1385113345-444056757",
    "displayProject": true,
    "createdAt": "2023-06-12T14:26:51.346Z",
    "updatedAt": "2023-06-12T14:26:51.346Z"
  }
}
```

## Error Response

**Condition** : If 'path route' is wrong.

**Code** : `404 BAD REQUEST`

**Content** :

```json
"Ruta no encontrada"
```

- [Back](../../readme.md) : `MainPage`
