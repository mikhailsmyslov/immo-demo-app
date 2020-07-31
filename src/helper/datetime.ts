import {
  format as dateFnsFormat,
  parseISO,
  Locale,
  toDate,
  isValid
} from 'date-fns'
import { ru, enUS } from 'date-fns/locale'
import { INVALID_DATE } from '../constants'

export type TDate = string | number | Date

type TGlobalBase = typeof window | typeof global
export type TGlobal = TGlobalBase & {
  __LOCALE_ID__?: string
}

export type TLocale = Object & { [key: string]: Locale }

const locales: TLocale = { ru, enUS }

const getGlobalObject = (): TGlobal | null => {
  let globalObj = null
  try {
    globalObj = window
  } catch (e) {}
  if (globalObj === null) {
    try {
      globalObj = global
    } catch (e) {}
  }
  return globalObj
}

const getLocale = (): Locale => {
  const localeId = getGlobalObject()?.__LOCALE_ID__ || 'enUS'
  return locales[localeId] || locales.enUs
}

export const setLocale = (localeId: string): void => {
  const globalObj = getGlobalObject()
  if (globalObj === null) return
  globalObj.__LOCALE_ID__ = localeId
}

export const parseDate = (value: TDate): Date | null => {
  let parsedValue = null
  if (typeof value === 'string') parsedValue = parseISO(value)
  if (typeof value === 'number') parsedValue = toDate(value)
  if (value instanceof Date) parsedValue = toDate(value)
  return isValid(parsedValue) ? parsedValue : null
}

export const formatDate = (
  value: TDate,
  format: string = 'yyyy-MM-dd'
): string => {
  const date = parseDate(value)
  if (!(date instanceof Date)) return INVALID_DATE
  try {
    return dateFnsFormat(date, format, { locale: getLocale() })
  } catch (error) {
    return INVALID_DATE
  }
}
