import { NewDiaryEntry } from '../types/types'
import { Weather, Visibility } from '../enums/enums'

//! Parseo las variables
const parseComment = (commentFromRequest: any): string => {
  if (!isString(commentFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return commentFromRequest
}

const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing date')
  }
  return dateFromRequest
}

const parseWeather = (weatherFromRequest: any): Weather => {
  if (!isString(weatherFromRequest) || !isWeather(weatherFromRequest)) {
    throw new Error('Incorrect or missing weather')
  }
  return weatherFromRequest
}

const parseVisibility = (visibilityFromRequest: any): Visibility => {
  if (!isString(visibilityFromRequest) || !isVisibility(visibilityFromRequest)) {
    throw new Error('Incorrect or missing visibility')
  }
  return visibilityFromRequest
}

//! Condiciones auxiliares
// Hay dos formas de crear String
// A) const msg = 'hola mundo'  B) const b = new String('hola mundo 2')
// A) es un string y B) es un objeto
const isString = (string: any): boolean => {
  return typeof string === 'string' || string instanceof String
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

// const isWeather = (string: string): boolean => {
//     return ['sunny','rainy','cloudy','windy','stormy'].includes(string)
// }
const isWeather = (params: any): boolean => {
  return Object.values(Weather).includes(params)
}

const isVisibility = (params: any): boolean => {
  return Object.values(Visibility).includes(params)
}

//! Construccion final del entry validado
const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    comment: parseComment(object.comment),
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility)
  }
  return newEntry
}

export default toNewDiaryEntry
