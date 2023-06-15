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
  "message": "Proyecto: ProjectX Creado con exito"
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
    "code": "too_small",
    "minimum": 2,
    "type": "string",
    "inclusive": true,
    "exact": false,
    "message": "El número de cuenta debe tener al menos 2 caracteres",
    "path": ["cuenta"]
  }
]
```

- [Back](../../readme.md) : `MainPage`
