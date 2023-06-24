# Update User Info

**URL** : `/userRoute/updateUserInfo`

**Method** : `PUT`

**Auth required** : YES

**Data constraints**

```json
{
  "id": "[valid string]",
  "updateName": "[valid string]",
  "updateLastName": "[valid string]",
  "updateEmail": "[valid string]",
  "file": "[valid file {orignalname,buffer}]",
  "country": "[valid string]",
  "city": "[valid string]",
  "postalCode": "[valid string]",
  "shortDescription": "[valid string]",
  "aboutMe": "[valid string]"
}
```

**Data example**

```json
{
  "id": "ac8ec82d-fc39-450b-bcab-bc2cc4b539b1",
  "updateName": "Ruben",
  "updateLastName": "Perez",
  "updateEmail": "example@example.com",
  "file": "fotoProfile.jpg",
  "country": "Argentina",
  "city": "Buenos Aires",
  "postalCode": "12346",
  "shortDescription": "Lorem ipsum dolor sit amet consect.",
  "aboutMe": "Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus cras rhoncus consequat tempor, id condimentum lacus taciti porttitor ac scelerisque sem."
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "data": {
    "id": "ac8ec82d-fc39-450b-bcab-bc2cc4b539b1",
    "name": "Guillermo",
    "lastName": "Paez",
    "email": "zeduard@gmail.com",
    "avatar": "https://proyectofinalhenry.blob.core.windows.net/azureusercontainer/ac8ec82d-fc39-450b-bcab-bc2cc4b539b1.jpg",
    "country": "Argentina",
    "city": "Buenos Aires",
    "postalCode": "12346",
    "shortDescription": "Lorem ipsum dolor sit amet consect.",
    "aboutMe": "Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus cras rhoncus consequat tempor, id condimentum lacus taciti porttitor ac scelerisque sem.",
    "date": "Mon Jun 19 02:10:03 2023 +0300",
    "createdAt": "2023-06-19T02:36:34.834Z",
    "updatedAt": "2023-06-19T23:46:46.535Z"
  }
}
```

## Error Response

**Condition** : If atribute or combination of atributes are missing.

**Code** : `400 BAD REQUEST`

**Content** :

```json
[
  {
    "code": "invalid_type",
    "expected": "number",
    "received": "undefined",
    "path": ["fundingDayLeft"],
    "message": "Required"
  }
]
```

**Condition** : If 'username' exist in DB

**Code**: `200 NOT FOUND` //CORREGIR

```json
{
  "errorMessage": "WHERE parameter "id" has invalid "undefined" value"
}
```

- [Back](../../readme.md) : `MainPage`
