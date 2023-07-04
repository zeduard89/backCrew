# Delete Project

**URL** : `/projectRoute/deleteProject`

**Method** : `DELETE`

**Auth required** : YES

**Data constraints**

```json
{
  "id": "[valid id]",
}
```

**Data example**

```json
{
  "id": "4fe3caa9-25c7-45c0-b2e8-020fdec35895",
}
```

## Success Response

**Code** : `200 OK`

**Content example**

```jsonTEXT
"Project Was Deleted Successfully"
```

## Error Response

**Condition** : If 'id' in DB does not exist.

**Code** : `400 BAD REQUEST` 

**Content** :

```jsonTEXT

 "Project not found"
```

- [Back](../../readme.md) : `MainPage`
