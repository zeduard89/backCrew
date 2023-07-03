# PUT User for LOGICAL DELETE

**URL** : `/userRoute/logicalDelete?userEmail={userEmail}&userId={userId}`

**Method** : `PUT`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

**Change de user parameter verified to false or true**
**If the user parameter verified is false the logical delete was successfully**
**If the user parameter verified is true the user was restored successfully**

```json
{
  "message": "User Was Deleted Successfully"
}

{
  "message": "User Was Restored Successfully"
}
```

## Error Response

**Condition** : Invalid ID or Email

**Code**: `400 NOT FOUND`

```json
{
  "errorMessage": "Email and ID are required"
}
```

- [Back](../../readme.md) : `MainPage`