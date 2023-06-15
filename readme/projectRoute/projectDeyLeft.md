# Get Day Left Project

**URL** : `/projectRoute/search/dayLeft/?name=ProjectX`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
{
  "year": 2023,
  "month": 7,
  "day": 12,
  "hours": 15,
  "minutes": 35,
  "seconds": 44,
  "daysLeft": 29
}
```

## Error Response

**Condition** : If 'Query' not found

**Code**: `400 NOT FOUND`

```json
{
  "errorMessage": "Project no existe"
}
```

- [Back](../../readme.md) : `MainPage`
