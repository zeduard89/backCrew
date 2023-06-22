# Delete User

**URL** : `/userRoute/deleteUserFovaorite/`

**Method** : `DELETE`

**Auth required** : YES

**Data constraints**

```json
{
  "userId": "[valid string]",
  "projectId": "[valid string]"
}
```

**Data example**

```json
{
  "userId": "123456",
  "projectId": "6ed674bd-ab73-4674-abae-679119e87ffe"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Project was successfully Deleted"
}
```

## Error Response

**Condition** : If 'email' and 'password' combination is wrong.

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "message": "Error: userId and projectId are required"
}
```

- [Back](../../readme.md) : `MainPage`
