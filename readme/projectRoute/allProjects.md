# Get all Projects

**URL** : `/projectRoute/allProject`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  //Example of Success Response
  [ {
        "id": 2,
        "title": "Proyecto 2",
        "description": "This is an example of a description.",
        "shortDescription": "This is a short description.",
        "fundingCurrent": 3665,
        "fundingGoal": 3890,
        "fundingGoalReached": false,
        "fundingPercentage": 94.2159383033419,
        "fundingDayLeft": 6,
        "likes": 6961,
        "disLikes": 7418,
        "category": "Community Projects",
        "bank": null,
        "account": "false",
        "location": "false",
        "projectFase": 0,
        "displayProject": true,
        "createdAt": "2023-06-16T13:42:16.273Z",
        "updatedAt": "2023-06-16T13:42:16.273Z"
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
