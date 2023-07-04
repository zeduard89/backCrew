# Crew Docs

`Develope url: https://localhost:3000/...`

## Open Endpoints

Open endpoints require no Authentication.

- [Login] : `Login With SuperBase`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

- [User Register](./readme/userRoute/register.md) : `POST /userRoute/register/`

### Account related

Endpoints for viewing and manipulating the Accounts that the Authenticated User
has permissions to access.

- [All User Projects](./readme/userRoute/getAllUsersProjects) : `GET /userRoute/getAllUsersProjects?creatorId={creatorId}`
- [All Users](./readme/userRoute/getAllUsers) : `GET /userRoute/getAllUsers`
- [User info](./readme/userRoute/getUserInfo.md) : `GET /userRoute/userDetails?id=${id}`
- [User Update](./readme/userRoute/updateUserInfo.md) : `PUT /userRoute/updateUserInfo`
- [Delete An Account](./readme/userRoute/delete.md) : `DELETE /WORKING_IN_PROGRESS`
- [Add User Favorite](./readme/userRoute/postUserFavorite.md) : `POST /userRoute/create/UserFavoriteRelationship?userId=${userId}&projectId=${projectId}`
- [Get all User Favorites ](./readme/userRoute/getAllUserFavorites.md) : `GET /userRoute/getAllUsersFavorites?userId=${userId}`
- [Delete User Favorites ](./readme/userRoute/deleteUserFavorite.md) : `DELETE /userRoute/deleteUserFavorite?userId=${userId}}&projectId={projectId}}`
- [Delete User ](./readme/userRoute/logicalDeleteUser.md) : `PUT /userRoute/logicalDelete?userEmail&userId`

### Projects related

Endpoints for viewing and manipulating the Projects that the Admin
has permissions to access

- [Create Project](./readme/projectRoute/createProject.md) : `POST /projectRoute/`
- [Get All Project](./readme/projectRoute/allProjects.md) : `GET /projectRoute/allProject`
- [Get All Project with Users/Fav](./readme/projectRoute/allProjectsWithUsers.md) : `GET /projectRoute/getAllProjects/withUsers`
- [Get Project By Name](./readme/projectRoute/projectByName.md) : `GET /projectRoute/search`
- [Get Day Left](./readme/projectRoute/projectDeyLeft.md) : `GET /projectRoute/search/dayLeft`
- [Delete Project](./readme/projectRoute/deleteProject.md) : `DELETE /projectRoute/deleteProject`
- [Update Project](./readme/projectRoute/updateProject.md) : `PUT /projectRoute/update`
- [UpdateCurrent Founding](./readme/projectRoute/updateCurrentFouding.md) : `PUT /projectRoute/update/addToFundingCurrent`
- [UpdateLikes](./readme/projectRoute/updateLikes.md) : `PUT /projectRoute/likes`
- [Get Five Most Funding](./readme/projectRoute/fiveMostFunding.md) : `Get /projectRoute/fiveMostFunding`
- [Get Twenty Most Trending](./readme/projectRoute/twentyMostTrending.md) : `Get /projectRoute/twentyMostTrending`
- [Get Filtered Projects](./readme/projectRoute/searchProjects.md) : `Get /projectRoute/searchProjects/`

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

### Payment Methods

- [Get payment made on a project](./readme/paymentRoute/getAllPaymentsFromOneProject.md) : `GET /paymentRoute/info/getAllPaymentsFromOneProject?projectId=${projectId}`
- [get payment made by User](./readme/paymentRoute/getAllPaymentsFromOneUser.md) : `GET /paymentRoute/info/getAllPaymentsFromOneUser?userId=${userId}`
- [Get Payment by Id](./readme/paymentRoute/getPaymentById.md) : `GET /paymentRoute/info/getPaymentById?paymentId=${paymentId}`
- [Mercado Pago Controller](./readme/paymentRoute/paymentController.md)

### DashBoard Admin

- [Get Main Info Data](./readme/adminRoute/getMainInfoData.md) : `GET /adminRoute/dashboardMain`
- [Get DashBoard Search Users](./readme/adminRoute/getDashboardSearchUsers.md) : `GET /adminRoute/dashboardSearchUsers?name&admin&funding`
- [Get Filtered Admin Projects](./readme/adminRoute/searchProjects.md) : `Get /adminRoute/searchProjects/`
- [Put Admin](./readme/adminRoute/putAdmin.md) : `PUT /adminRoute/userToAdmin?userID={id}`

### Developer Tools

- [Create Random Project](./readme/projectRoute/llenarDB100.md) : `POST /projectRoute/llenarDB?usuarios${number}`

### Build Tsc

npm run tsc
