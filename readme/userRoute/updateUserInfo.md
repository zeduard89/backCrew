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
  "updateCountry": "[valid string]",
  "updateCity": "[valid string]",
  "updatePostalCode": "[valid string]",
  "updateShortDescription": "[valid string]",
  "updateAboutMe": "[valid string]"
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
  "updateCountry": "Venezuela",
  "updateCity": "Ciudad de Venezuela",
  "updatePostalCode": "1668",
  "updateShortDescription": "It's is a short description",
  "updateAboutMe": "Here is a short description about me"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Update was successfully"
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
  "errorMessage": "WHERE parameter 'id' has invalid 'undefined' value"
}
```

- [Back](../../readme.md) : `MainPage`
