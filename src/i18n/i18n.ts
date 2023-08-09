import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HEADER_EN from './locales/en/header.json'
import HEADER_VI from './locales/vi/header.json'
import DATA from '../hust/data.json'
import DATA1 from '../hust/data1.json'

const resources = {
  en: {
    header: HEADER_EN,
    data: DATA1
  },
  vi: {
    header: HEADER_VI,
    data: DATA
  },
};

const defaultNS = 'header'

i18n.use(initReactI18next).init({
    resources,
    lng: "vi", 
    ns: ['header','data'],
    fallbackLng: 'vi',
    // defaultNS,
   
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
});
