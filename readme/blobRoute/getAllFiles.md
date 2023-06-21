# Get all url Image from container

**URL** : `/blobRoute/getAllFiles/:crew1`

**Method** : `GET`

**Auth required** : YES

## Success Response

**Code** : `200 OK`

**Content example**

```json
[
  {
    "name": "carrusel1.jpg",
    "url": "https://proyectofinalhenry.blob.core.windows.net/crew1/carrusel1.jpg?sv=2022-11-02&st=2023-06-14T18%3A14%3A08Z&se=2023-06-15T18%3A14%3A08Z&sr=b&sp=r&sig=yjlqBuxORMBlM5P3HOPETPYXhjIZW007TGGGjrm5%2BWs%3D&rscd=inline"
  },
  {
    "name": "carrusel2.jpg",
    "url": "https://proyectofinalhenry.blob.core.windows.net/crew1/carrusel2.jpg?sv=2022-11-02&st=2023-06-14T18%3A14%3A08Z&se=2023-06-15T18%3A14%3A08Z&sr=b&sp=r&sig=ape64xPfVMyfTkOUovKBlTtppRK1TZ8V2CF0MWSh%2Bqw%3D&rscd=inline"
  }
]
```

## Error Response

**Condition** : If 'Container(params)' not found

**Code**: `400 NOT FOUND`

```Not json

No existe el container: image

```

- [Back](../../readme.md) : `MainPage`
