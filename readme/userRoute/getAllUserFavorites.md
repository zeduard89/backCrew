# Get All User's Favorite Projects

**URL** : `/userRoute/getAllUsersFavorites?userId=ac8ec82d-fc39-450b-bcab-bc2cc4b539b1`

**Method** : `GET`

**Auth required** : YES

**Data constraints**

```json
{
  "id": "[valid string]"
}
```

**Data example**

```json
{
  "id": "ac8ec82d-fc39-450b-bcab-bc2cc4b539b1"
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
    [
        {
            "id": "6ed674bd-ab73-4674-abae-679119e87ffe",
            "title": "Chips2",
            "description": "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
            "shortDescription": "Soluta repellendus natus earum deleniti pariatur libero repudiandae eligendi neque nobis optio.",
            "fundingCurrent": 61036,
            "fundingGoal": 84136,
            "fundingGoalReached": false,
            "fundingPercentage": 72,
            "fundingDayLeft": 238,
            "likes": 4,
            "disLikes": 6,
            "category": "Creative Works",
            "bank": null,
            "account": "false",
            "location": "false",
            "projectFase": 0,
            "displayProject": true,
            "creatorId": "ac8ec82d-fc39-450b-bcab-bc2cc4b539b1",
            "createdAt": "2023-06-21T06:06:35.632Z",
            "updatedAt": "2023-06-21T06:06:35.632Z",
            "UserFavorite": {
                "userId": "123456",
                "projectId": "6ed674bd-ab73-4674-abae-679119e87ffe",
                "createdAt": "2023-06-21T06:07:23.264Z",
                "updatedAt": "2023-06-21T06:07:23.264Z"
            }
        }, ...{},{}
    ]
}
```

## Error Response

**Condition** : If 'userId' doesn't exist in DB

**Code**: `500 NOT FOUND`

```json
{
  "message": "Error: User not found"
}
```

- [Back](../../readme.md) : `MainPage`
