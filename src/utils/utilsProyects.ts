import { newProyects } from '../types/types'
import { Categories } from '../types/enums'

//! Parseo las variables(REQ BODY)
//! const newProyect = toNewProyects(req.body);
const parseTitle = (titleFromRequest: string): string => {
  if (typeof titleFromRequest !== 'string') {
    throw new Error('Incorrect or missing title')
  }
  return titleFromRequest
}

const parseDescription = (descriptionFromRequest: string): string => {
  if (typeof descriptionFromRequest !== 'string') {
    throw new Error('Incorrect or missing Description')
  }
  return descriptionFromRequest
}

const parseFounding = (foundingFromRequest: string): string => {
  if (typeof foundingFromRequest !== 'string') {
    throw new Error('Incorrect or missing Founding')
  }
  return foundingFromRequest
}

const parseUpdate = (updateFromRequest: string): string => {
  if (typeof updateFromRequest !== 'string') {
    throw new Error('Incorrect or missing Update')
  }
  return updateFromRequest
}

const parseStory = (storyFromRequest: string): string => {
  if (typeof storyFromRequest !== 'string') {
    throw new Error('Incorrect or missing Story')
  }
  return storyFromRequest
}

const parseProblem = (problemFromRequest: boolean): boolean => {
  if (typeof problemFromRequest !== 'boolean') {
    throw new Error('Incorrect or missing Problem')
  }
  return problemFromRequest
}

const parseCategories = (categoriesFromRequest: any): Categories => {
  if (!isString(categoriesFromRequest) || !isCategories(categoriesFromRequest)) {
    throw new Error('Incorrect or missing Categories')
  }
  return categoriesFromRequest
}

//! Condiciones auxiliares

const isString = (string: any): boolean => {
  return typeof string === 'string'
}

const isCategories = (value: any): boolean => {
  return Object.values(Categories).includes(value)
}

//! Construccion final del entry validado
const toNewProyects = (object: any): newProyects => {
  const newEntry: newProyects = {
    title: parseTitle(object.title),
    description: parseDescription(object.description),
    funding: parseFounding(object.funding),
    update: parseUpdate(object.update),
    story: parseStory(object.story),
    problem: parseProblem(object.problem),
    categories: parseCategories(object.categories)
  }
  return newEntry
}

export default toNewProyects
