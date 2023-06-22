# Get all Users

**URL** : `/userRoute/getAllUsers`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  //Example of Success Response
[
    {
        "id": "ac8ec82d-fc39-450b-bcab-bc2cc4b539b1",
        "name": "Gwendolyn1",
        "lastName": "Gleichner",
        "email": "Gwendolyn1_Gleichner@yahoo.com",
        "avatar": "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/921.jpg",
        "date": "Mon Jun 19 02:10:03 2023 +0300",
        "createdAt": "2023-06-19T02:36:34.834Z",
        "updatedAt": "2023-06-19T02:36:34.834Z"
    },
 {}... ]
}
```

## Error Response

**Condition** : If 'path route' is wrong.

**Code** : `404 BAD REQUEST`

**Content** :

```String
"Route not found"
```

- [Back](../../readme.md) : `MainPage`
