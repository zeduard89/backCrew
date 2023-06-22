# Crew Docs

`Develope url: https://localhost:3000/...`

## Open Endpoints

Open endpoints require no Authentication.

- [Login](./readme/userRoute/login.md) : `POST /userRoute/login/`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

- [Show info](./readme/userRoute/user.md) : `GET /userRoute/user/`

### Account related

Endpoints for viewing and manipulating the Accounts that the Authenticated User
has permissions to access.

- [Create Account](./readme/userRoute/register.md) : `POST /userRoute/register/`
- [Upload User image](./readme/userRoute/uploadImage.md) : `POST /userRoute/uploadImage`
- [Update An Account](./readme/userRoute/updateInfo.md) : `PUT /*Working in progress*`
- [Delete An Account](./readme/userRoute/delete.md) : `DELETE /userRoute/delete`

### Projects related

Endpoints for viewing and manipulating the Projects that the Front
has permissions to access

- [Create Random Project](./readme/projectRoute/llenarDB100.md) : `POST /projectRoute/llenarDB100`
- [Create Project](./readme/projectRoute/createProject.md) : `POST /projectRoute/`
- [Get All Project](./readme/projectRoute/allProjects.md) : `GET /projectRoute/allProject`
- [Get Project By Name](./readme/projectRoute/projectByName.md) : `GET /projectRoute/search`
- [Get Day Left](./readme/projectRoute/projectDeyLeft.md) : `GET /projectRoute/search/dayLeft`
- [Delete Project](./readme/projectRoute/deleteProject.md) : `DELETE /projectRoute/deleteProject`
- [Update Project](./readme/projectRoute/updateProject.md) : `PUT /projectRoute/update`
- [UpdateCurrent Founding](./readme/projectRoute/updateCurrentFouding.md) : `PUT /projectRoute/update/addToFundingCurrent`
- [UpdateLikes](./readme/projectRoute/updateLikes.md) : `PUT /projectRoute/likes`
- [Get the twenty most trending](./readme/projectRoute/twentyMostTrending.md) : `GET /twentyMostTrending`
- [Get five most funding](./readme/projectRoute/fiveMostFunding.md) : `GET /fiveMostFunding`
- [Get search Filter](./readme/projectRoute/searchProjects.md) : `GET /searchProjects/`


### Azure Containers related

Endpoints for viewing and manipulating the Projects that the Admin
has permissions to access

- [Create Contaiener](./readme/blobContainerRoute/create.md) : `POST /blobContainerRoute/create`
- [Get All Containers](./readme/blobContainerRoute/containers.md) : `GET /blobContainerRoute/containers`
- [Delete Container](./readme/blobContainerRoute/delete.md) : `DELETE /blobContainerRoute/delete`

### Azure Blobs

Endpoints for viewing and manipulating the Projects that the Admin
has permissions to access

- [Deposit/Create Blob](./readme/blobRoute/create.md) : `POST /blobRoute/create`
- [Get Urls from Container](./readme/blobRoute/getAllFiles.md) : `GET /blobRoute/getAllFiles/images`
- [Get Image Buffer](./readme/blobRoute/images.md) : `GET /blobRoute/get/images/`
- [Delete Image](./readme/blobRoute/delete.md) : `DELETE /blobRoute/delete/`

