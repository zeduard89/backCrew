import { DataTypeUUID } from "sequelize"

export interface IUser {
  name: string
  lastName: string
  email: string
  password: string
}

export interface IUpdateComment {
  id: string
  firstName: string
  comments: string
  likes: number
  dislikes: number
  date: string
}

export interface IUpdate {
  id: string
  title: string
  description: string
  data: string
  comments: IUpdateComment[]
}

export interface ICreator {
  id: DataTypeUUID
  firstName: string
  lastName: string
  avatar: string
}

export interface IProject {
  title: string
  description: string
  fundingCurrent: number
  fundingGoal: number
  fundingGoalReached: boolean
  fundingPercentage: number
  fundingDayLeft: number
  // update: IUpdate[]
  categories: string[]
  // creator: ICreator  CADA PROYECTO TIENE ASOCIADO UN USER
  image: string
}

// Por defecto TS utiliza este nombre en el fichero 'types.d.ts'
// Puedo tener varios esparcidos, pero ahora solo los coloco en este luegar
// traduce elementos para que TC los entienda como lo de color ROJO, eso lo cree en ENUM
//! export type Visibility = 'great' | 'good' | 'ok' | 'poor'

// import { Weather, Visibility } from '../enums/enums'

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
