# Get DashBoard Search Users

**URL** : `/adminRoute/dashboardSearchUsers?name&admin&funding`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

**Array with object and properties of a user (email, name, lastname, and totalPayments). If there are no payments in the database, it returns the message 'There are no payments in the database'.**

```json
[{
    "id": "ac8ec82d-fc39-450b-bcab-bc2cc4b539b1",
    "name": "Isaac1",
    "lastName": "Heidenreich",
    "email": "Isaac1_Heidenreich@yahoo.com",
    "totalPayments": 0
  },
  {
    "id": "ac8ec82d-fc39-450b-bcab-bc2cc4b539b3",
    "name": "Margarita3",
    "lastName": "Grimes",
    "email": "Margarita352@yahoo.com",
    "totalPayments": 0
  },
  {}],
```
**Query endpoint Example:** 

/adminRoute/dashboardSearchUsers?name=Carlo&admin=admin&funding=yes

**Where:**

**name:** this+is+a+Query+Name+Lastname

**admin** admin, user, null(send all users)

**funding:** yes(sort de users with payments)

## Error Response

**Condition** : Empty database

**Code**: `400 NOT FOUND`

```json
{
  "errorMessage": "Unknown error while searching users in DashBoard Admin"
}
```

- [Back](../../readme.md) : `MainPage`