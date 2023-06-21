# POST 100 Random Project

**URL** : `/projectRoute/llenarDB?usuarios=${number}`

**Method** : `POST` This Route just can use one Time

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  //Example of Success Response
  //Projects
  [ {
        "id": "3a16e0cb-7eb8-4a80-b89b-e00e74482344",
        "title": "Table42",
        "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
        "shortDescription": "Consequuntur tenetur tempore esse ex harum temporibus explicabo officia doloribus temporibus quisquam.",
        "fundingCurrent": 53473,
        "fundingGoal": 408987,
        "fundingGoalReached": false,
        "fundingPercentage": 13.074498700447693,
        "fundingDayLeft": 277,
        "likes": 4,
        "disLikes": 3,
        "category": "Community Projects",
        "bank": null,
        "account": "false",
        "location": "false",
        "projectFase": 0,
        "displayProject": true,
        "creatorId": "ac8ec82d-fc39-450b-bcab-bc2cc4b539b41",
        "createdAt": "2023-06-19T02:36:35.047Z",
        "updatedAt": "2023-06-19T02:36:35.047Z"
    },
 {}... ]
// Users
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
{} {} {}]

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
