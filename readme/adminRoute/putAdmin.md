# Get DashBoard Search Users

**URL** : `/adminRoute/userToAdmin?userID={id}`

**Method** : `PUT`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

**Change de user parameter admin to false or true**

```json
{
  "message": "${user.name} ${user.lastName} is now an admin"
},
```

## Error Response

**Condition** : Invalid ID

**Code**: `400 NOT FOUND`

```json
{
  "errorMessage": "Valid userID is required"
}
```

- [Back](../../readme.md) : `MainPage`