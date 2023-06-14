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

Endpoints for viewing and manipulating the Projects that the Authenticated User
has permissions to access

- [Create Project](./readme/projectRoute/createProject.md) : `POST /projectRoute/`
- [Get All Project](./readme/projectRoute/allProjects.md) : `GET /projectRoute/allProject`
- [Get Project By Name](./readme/projectRoute/projectByName.md) : `GET /projectRoute/search`
- [Get Day Left](./readme/projectRoute/projectDeyLeft.md) : `GET /projectRoute/search/dayLeft`
- [Delete Project](./readme/projectRoute/deleteProject.md) : `DELETE /projectRoute/deleteProject`
- [Update Project](./readme/projectRoute/updateProject.md) : `PUT /projectRoute/update`
- [UpdateCurrent Founding](./readme/projectRoute/updateCurrentFouding.md) : `PUT /projectRoute/update/addToFundingCurrent`
- [UpdateLikes](./readme/projectRoute/updateLikes.md) : `PUT /projectRoute/likes`