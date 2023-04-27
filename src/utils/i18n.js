import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Conditions for english translation
      alphabet: "Alphabet",
      icon: "Icon",
      pictogram: "Pictogram",
      profileTab: "Profile",
      back:"Back",
      settingsTab: "Settings",
      deleteKeyboardTitle: "DELETE NEW KEYBOARD",
      deleteKeyboardMessage: "Are you sure that you like to DELETE this keyboard?",
      cancel: "Cancel",
      delete: "Delete",

    },
  },
  es: {
    translation: {
      // Conditions for spanish translations
      alphabet: "Alfabeto",
      icon: "Icono",
      pictogram: "Pictograma",
      profileTab: "Perfil",
      back:"Atrás",
      settingsTab: "Ajustes",
      deleteKeyboardTitle: "ELIMINAR TECLADO NUEVO",
      deleteKeyboardMessage: "¿Estás seguro de que deseas ELIMINAR este teclado?",
      cancel: "Cancelar",
      delete: "Eliminar",
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
