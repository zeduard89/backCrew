# Update

**URL** : `/userRoute/login/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{}
```

**Data example**

```json
{}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{}
```

## Error Response

**Condition** : If 'username' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  //Corregir detalles
}
```

**Condition** : If 'username' not found

**Code**: `400 NOT FOUND`

```json
{}
```

- [Back](../../readme.md) : `MainPage`
