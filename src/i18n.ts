import i18n, { Callback } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { setLocale, formatDate } from './helper/datetime'
import en from './locales/en/translation.json'
import ru from './locales/ru/translation.json'

export default async (callback: Callback) => {
  i18n.on('languageChanged', (lng) => {
    const [localeName] = lng.split('-')
    setLocale(localeName.toLowerCase())
  })
  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(
      {
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',

        interpolation: {
          escapeValue: false,
          format: (value: string | number, format) => formatDate(value, format)
        },
        resources: {
          en: { translation: en },
          ru: { translation: ru }
        }
      },
      callback
    )
}
