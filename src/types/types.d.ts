export interface IUser {
  id: string
  name: string
  lastName: string
  email: string
  avatar: string
  // projects: Array[]
  date: string
  // password: string
  // verified?: boolean
  // access: boolean
}

export type IUserLD = Omit<IUser, "name", "lastName", "id", "Date">

export interface IUpdateUser {
  id: string
  updateName?: string
  updateLastName?: string
  updateEmail?: string
}

export interface IUserFavorite {
  userId: string
  projectsId: string
}

export interface IComment {
  id: string
  firstName: string
  comments: string
  likes: number
  dislikes: number
  date: string
  displayComment: boolean
}

// export interface ICreator {
//   id: DataTypeUUID
//   firstName: string
//   lastName: string
//   avatar: string
// }

// El signo de pregunta permite que sea opcional
export interface IProject {
  id?: number
  title: string
  description: string
  shortDescription?: string
  fundingCurrent?: number
  fundingGoal: number
  fundingGoalReached: boolean
  fundingPercentage?: number
  fundingDayLeft: number
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
  // dateApproved: string
  // dateCreated: string
  userId: string
  projectId: string
}

// Por defecto TS utiliza este nombre en el fichero 'types.d.ts'
// Puedo tener varios esparcidos, pero ahora solo los coloco en este luegar
// traduce elementos para que TC los entienda como lo de color ROJO, eso lo cree en ENUM
//! export type Visibility = 'great' | 'good' | 'ok' | 'poor'

// import { Weather, Visibility } from '../enums/enums'
// import { updateFundingCurrentValidator } from "../schemas/projectSchemas"

// export interface DiaryEntry {
//   id: number
//   date: string
//   weather: Weather
//   visibility: Visibility
//   comment: string
// }
//  OPCION1)
//  export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, 'id'|'date'|'weather'|'visibility'>

// OPCION2 otro tipo de utilidad
// export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'comment'>

// export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

//
//  TEORIA
// INTERFACE Permite heredar las propiedades de DiaryEntry, puedo tener atributos que se añaden y no repiten
// interface SpecialDiaryEntry extends DiaryEntry {
//    flightNumber: number
// }

// Con TYPE seria distinto, usar Cuando son FIJAS
// type SpecialDiaryEntry2 = DiaryEntry & {
//     flightNumber: number
// }
