export interface IImages {
  projectId: string
  name: string
  url: string
}

export interface IUser {
  id: string
  name: string
  lastName: string
  email: string
  avatar: string
  // projects: Array[]
  date: string
  verified?: boolean
  // Add country, city, postalCode, shortDescription, aboutMe
  country: string
  city: string
  postalCode: string
  shortDescription: string
  aboutMe: string
  admin?: boolean
}

export type IUserDelete = Omit<
  IUser,
  "name",
  "lastName",
  "avatar",
  "Date",
  "country",
  "city",
  "postalCode",
  "shortDescription",
  "aboutMe"
>

export type IUserLD = Omit<
  IUser,
  "name",
  "lastName",
  "id",
  "Date",
  "country",
  "city",
  "postalCode",
  "shortDescription",
  "aboutMe"
>

export interface IUpdateUser {
  id: string
  updateName?: string
  updateLastName?: string
  updateEmail?: string
  updateCountry?: string
  updateCity?: string
  updatePostalCode?: string
  updateShortDescription?: string
  updateAboutMe?: string
}

export interface IUserFavorite {
  userId: string
  projectsId: string
}

export interface IComment {
  id?: number
  name: string
  description: string
  likes?: number
  disLikes?: number
  date?: string
  displayComment?: boolean
  userId: string
  projectId: string
  parentId?: number
}
export type ILikeComment = Omit<
  // Si uso
  IComment,
  "name",
  "description",
  "date",
  "displayComment",
  "userId",
  "projectId",
  "parentId"
>
export type ICommentUpdate = Omit<
  // Si uso
  IComment,
  "date",
  "displayComment",
  "likes",
  "disLikes",
  "parentId"
>

export type childComment = Omit<
  // Si uso
  IComment,
  "id",
  "likes",
  "disLikes",
  "date",
  "displayComment"
>

// export interface ICreator {
//   id: DataTypeUUID
//   firstName: string
//   lastName: string
//   avatar: string
// }

// El signo de pregunta permite que sea opcional
export interface IProject {
  id?: number
  title?: string
  description?: string
  shortDescription?: string
  fundingCurrent?: number
  fundingGoal?: number | string
  fundingGoalReached?: boolean
  fundingPercentage?: number
  fundingDayLeft?: number | string
  likes?: number
  disLikes?: number
  category?: string
  bank?: string
  account?: string
  location?: string
  projectFase?: number
  displayProject?: boolean
  creatorId?: string
}

export interface Project extends Model {
  // Propiedades existentes de Project
  id?: number
  title?: string
  description?: string
  shortDescription?: string
  fundingCurrent?: number
  fundingGoal?: number | string
  fundingGoalReached?: boolean
  fundingPercentage?: number
  fundingDayLeft?: number | string
  likes?: number
  disLikes?: number
  category?: string
  bank?: string
  account?: string
  location?: string
  projectFase?: number
  displayProject?: boolean
  creatorId?: string
  // Propiedad adicional mainImage
  mainImage: string[]
}

// Uso title displayProject
export type deleteIProyect = Omit<
  IProject,
  "description",
  "shortDescription",
  "fundingCurrent",
  "fundingGoal",
  "fundingGoalReached",
  "fundingPercentage",
  "fundingDayLeft",
  "category",
  "bank",
  "account"
  // "creatorId"
>
// Uso title y currentFunding
export type updateFundingCurrentIProyect = Omit<
  IProject,
  "title",
  "description",
  "shortDescription",
  "fundingGoal",
  "fundingGoalReached",
  "fundingDayLeft",
  "category",
  "bank",
  "account",
  "displayProject"
  // "creatorId"
>

// Uso title y likes/disLikes
export type updateLikes = Omit<
  IProject,
  "title",
  "description",
  "fundingCurrent",
  "fundingGoal",
  "fundingGoalReached",
  "fundingPercentage",
  "fundingDayLeft",
  "category",
  "bank",
  "account",
  "displayProject"
  // "creatorId"
>

// Uso una interface nueva Proyect x 2
export interface updateProject {
  id: string
  title: string
  description: string
  shortDescription: string
  fundingGoal: number
  fundingDayLeft: number
  category: string
  bank: string
  account: string
}

export interface limitDate {
  year: number
  month: number
  day: number
  hours: number
  minutes: number
  seconds: number
  daysLeft: number
}

export interface IPaymentDetail {
  id: number
  payerId: string
  currencyId: string
  description: string
  operationType: string
  orderId: string
  ordertype: string
  firstName?: string | null
  lastName?: string | null
  email: string
  identificationNumber: string
  identificationType: string
  phoneAreaCode?: string | null
  phoneNumber?: string | null
  phoneExtension?: string | null
  type?: string | null
  entityType?: string | null
  paymentMetodId: string
  status: string
  statusDetail: string
  taxesAmount: number
  transactionAmount: number
  transactionAmountRefunded: number
  transactionReceived: number
  dateApproved?: string
  dateCreated?: string
  userId: string
  projectId: string
}

interface ErrorBody {
  code: string
  expected: string
  received: string
  path: string
}

// infoMatches Interface
export interface IinfoMatches {
  totalFundsRaised: number
  chartTotalFundsRaised: object
  chartFundsRaisedPerMonth: Array
  allRegisteredUsers: number
  chartRegisteredUsersPerMonth: Array
  activeProjects: number
  chartActiveProjects: object
  chartActiveProjectsPerMonth: Array
}
