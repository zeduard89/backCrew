# User Relationships with projects

**URL** : `/userRoute/create/UserFavoriteRelationship?userId=123456&projectId=5ff09b30-9165-49ad-8cf2-337e08057125`

**Method** : `POST`

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
  "projectId": "5ff09b30-9165-49ad-8cf2-337e08057125"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Relationship successfully added"
}
```

## Error Response

**Condition** : If atribute or combination of atributes are missing.

**Code** : `500 BAD REQUEST`

**Content** :

```json
{
  "message": "Error: userId and projectId are required"
}
```

**Condition** : If 'username' exist in DB

**Code**: `500 NOT FOUND`

```json
{
  "message": "Error: User not found"
}
```

- [Back](../../readme.md) : `MainPage`
