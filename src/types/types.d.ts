export interface IUser {
  name: string
  lastName: string
  email: strin
  password: string
}

// export interface IUpdateComment {
//   id: string
//   firstName: string
//   comments: string
//   likes: number
//   dislikes: number
//   date: string
// }

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
  fundingCurrent?: number
  fundingGoal: number
  fundingGoalReached: boolean
  fundingPercentage?: number //! Relacionar con goal y reach guillermo
  fundingDayLeft: number //! relacionar con createdA guillermo
  categories: string[]
  // creator: ICreator  CADA PROYECTO TIENE ASOCIADO UN USER
  image: string
  displayProject: boolean
}
// Uso title displayProject
export type deleteIProyect = Omit<
  IProject,
  "description",
  "fundingCurrent",
  "fundingGoal",
  "fundingGoalReached",
  "fundingPercentage",
  "fundingDayLeft",
  "categories",
  "image"
>
// Uso title y currentFunding
export type updateFundingCurrentIProyect = Omit<
  IProject,
  "description",
  "fundingGoal",
  "fundingGoalReached",
  "fundingDayLeft",
  "categories",
  "image",
  "displayProject"
>
// Uso una interface nueva
export interface updateProject {
  id: number
  title: string
  description: string
  fundingGoal: number
  fundingDayLeft: number
  categories: string[]
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
