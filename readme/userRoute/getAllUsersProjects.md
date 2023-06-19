# Get all User Projects

**URL** : `/userRoute/getAllUsersProjects?creatorId=${creatorId}`

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
        "id": "61f42094-2f4c-4452-aa07-41c57fc521cd",
        "title": "Keyboard36",
        "description": "Andy shoes are designed to keeping in mind durability as well as trends, the most stylish range of shoes & sandals",
        "shortDescription": "Ab delectus vel deleniti nobis dignissimos mollitia quod possimus.",
        "fundingCurrent": 402634,
        "fundingGoal": 47644,
        "fundingGoalReached": false,
        "fundingPercentage": 845.0885735874401,
        "fundingDayLeft": 122,
        "likes": 4,
        "disLikes": 2,
        "category": "Creative Works",
        "bank": null,
        "account": "false",
        "location": "false",
        "projectFase": 0,
        "displayProject": true,
        "creatorId": "ac8ec82d-fc39-450b-bcab-bc2cc4b539b35",
        "createdAt": "2023-06-19T02:36:35.023Z",
        "updatedAt": "2023-06-19T02:36:35.023Z"
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
