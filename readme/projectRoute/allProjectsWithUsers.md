# Get all Projects

**URL** : `/projectRoute/getAllProjects/WithUsers`

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
        "id": "ee235f93-4d02-44c0-bc4f-5b5f988d4dc1",
        "title": "Gloves2",
        "description": "The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
        "shortDescription": "Vel autem suscipit impedit mollitia hic ab necessitatibus.",
        "fundingCurrent": 6455,
        "fundingGoal": 301596,
        "fundingGoalReached": false,
        "fundingPercentage": 2,
        "fundingDayLeft": 78,
        "likes": 7,
        "disLikes": 7,
        "category": "Creative Works",
        "bank": null,
        "account": "false",
        "location": "false",
        "projectFase": 0,
        "displayProject": true,
        "creatorId": "ac8ec82d-fc39-450b-bcab-bc2cc4b539b1",
        "createdAt": "2023-06-22T00:50:32.853Z",
        "updatedAt": "2023-06-22T00:50:32.853Z",
        "UserFavorite": {
            "userIds": [
                "123456",
                "ac8ec82d-fc39-450b-bcab-bc2cc4b539b1",
                "ac8ec82d-fc39-450b-bcab-bc2cc4b539b11"
            ]
        }
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
