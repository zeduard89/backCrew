import { DiaryEntry, NewDiaryEntry, NonSensitiveInfoDiaryEntry } from '../types/types'
import diaryData from './diaries.json'

//  creo diaries , que es un Array de tipo DiaryEntry(del tipo OBJ que cree), que lo traigo de diaryData
//! Utilizo Asercion de tipos, como el jason puede tener cualquier variable, le AFIRMO que es como lo indico
//! en este caso suscede que Wether lo quiere ver como un string y no es asi (evitar usar esto)
const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getEntries = (): DiaryEntry[] => diaries

export const findById = (id: number): NonSensitiveInfoDiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id)
  if (entry != null) {
    const { comment, ...restOfDiary } = entry
    return restOfDiary
  }
  return undefined
}

export const getEntriesWithouSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
  // getEntriesWithouSensitiveInfo, devuelve un objeto sin comment, pero TC no lo detecta en entorno dinamico
  // TC entiende en estatico lo que tiene, pero al retornar algo dinamico, necesitamos recuperarlo nosotros por eso el MAP
  return diaries.map(({ id, date, weather, visibility }) => {
    return {
      id,
      date,
      weather,
      visibility
    }
  })
}

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...newDiaryEntry
  }
  diaries.push(newDiary)
  return newDiary
}
