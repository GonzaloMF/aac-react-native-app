import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Aquí van todas las traducciones en inglés
      alphabet: "Alphabet",
      icon: "Icon",
      pictogram: "Pictogram",
    },
  },
  es: {
    translation: {
      // Aquí van todas las traducciones en español
      alphabet: "Alfabeto",
      icon: "Icono",
      pictogram: "Pictograma",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
