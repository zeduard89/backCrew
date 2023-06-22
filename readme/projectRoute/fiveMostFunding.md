# Get five most funding

**URL** : `/projectRoute/fiveMostFunding`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

**5 project array with most fundingCurrent**

```json
[
  {
    "id": 31,
    "title": "Inteligencia artificial en el arte",
    "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit phasellus cras rhoncus consequat tempor, id condimentum lacus taciti porttitor ac scelerisque sem.",
    "shortDescription": "Est augue gravida morbi purus facilisis fermentum feugiat penatibus molestie, tortor vulputate in metus blandit convallis parturient cum consequat.",
    "fundingCurrent": 25799793,
    "fundingGoal": 286836571,
    "fundingGoalReached": false,
    "fundingPercentage": 37,
    "fundingDayLeft": 21,
    "likes": 1479,
    "disLikes": 1205,
    "category": "Creative Works",
    "bank": null,
    "account": "false",
    "location": "false",
    "projectFase": 0,
    "displayProject": true,
    "createdAt": "2023-06-16T15:18:48.848Z",
    "updatedAt": "2023-06-16T15:18:48.848Z"
  }
]
```

## Error Response

**Condition** : Empty database

**Code**: `400 NOT FOUND`

```json
{
  "errorMessage": "Unknown error while fetching most funded projects"
}
```

- [Back](../../readme.md) : `MainPage`