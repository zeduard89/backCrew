# User Register

**URL** : `/userRoute/register/`

**Method** : `POST`

**Auth required** : NO

**Data constraints**

```json
{
  "id": "[valid String]",
  "name": "[valid String]",
  "lastName": "[valid String]",
  "email": "[valid String]"
}
```

**Data example**

```json
{
  "data": {
    "id": "ac8ec82d-fc39-450b-bcab-bc2cc4b539b12333",
    "name": "Johnn",
    "lastName": "Morel",
    "email": "john@example5.com"
  }
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "registerUser": {
    "id": "ac8ec82d-fc39-450b-bcab-bc2cc4b539b12333",
    "name": "Johnn",
    "lastName": "Morel",
    "email": "john@example5.com",
    "avatar": "https://proyectofinalhenry.blob.core.windows.net/defaultcontainer/userDefault.png?sv=2022-11-02&st=2023-06-19T20%3A29%3A43Z&se=2023-06-20T20%3A29%3A43Z&sr=b&sp=r&sig=o0A9JlctL0UMOFYpiQFjHCL26QNNxH09r5mytjQPdw8%3D&rscd=inline",
    "date": "Mon Jun 19 2023 17:29:43 GMT-0300 (Argentina Standard Time)",
    "updatedAt": "2023-06-19T20:29:43.299Z",
    "createdAt": "2023-06-19T20:29:43.299Z"
  }
}
```

## Error Response

**Condition** : If 'email' is missing in sended attributes.

**Code** : `400 BAD REQUEST`

**Content** :

```Notjson

Email already used

```

**Condition** : If 'email' exist in DB .

**Code** : `400 BAD REQUEST`

**Content** :

```Notjson

Email already used

```

- [Back](../../readme.md) : `MainPage`
