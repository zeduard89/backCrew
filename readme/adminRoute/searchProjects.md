# Get search projects filter

**URL** : `/searchProjects/?category=?&sort=?&p=?&s=?&country=?&q=?`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

**Object with projects property with array's number of projects determined by the query.**

```json
  {
        "projects": [
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
            "location": "Argentina",
            "projectFase": 0,
            "displayProject": true,
            "createdAt": "2023-06-16T15:18:48.848Z",
            "updatedAt": "2023-06-16T15:18:48.848Z"
          }
],
  }
  

When sending the last projects of the result array, the following object is sent.

```json
  {
        "projects": [
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
            "location": "Argentina",
            "projectFase": 0,
            "displayProject": true,
            "createdAt": "2023-06-16T15:18:48.848Z",
            "updatedAt": "2023-06-16T15:18:48.848Z"
          }
],
        "limit": "There is nothing else to show.",
      };
  
```


**Query endpoint Example:** 

/adminRoute/searchProjects/?category=all&sort=trending&p=0&s=2&country=argentina&q=energia

**Where:**

**category:** all, Tech+&+Innovation, Creative+Works, Community+Projects

**sort:** trending, most funding

**p:** index number of the result array

**s:** number of projects per result

**q:** this+is+a+Query

**country:** all, Argentina, Mexico, Colombia, Peru, Venezuela.

## Error Response

**Condition** : "Queries" not found

**Code**: `400 NOT FOUND`

```json
{
  "errorMessage": "There are no projects with this parameters"
}
```

- [Back](../../readme.md) : `MainPage`