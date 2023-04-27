import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/* Conditions for english translation */
const resources = {
  en: {
    translation: {
      //Menu tabs
      profile: "Profile",
      back:"Back",
      settings: "Settings",
      addKeyboard: "Add Keyboard",
      //Keyboards
      alphabet: "Alphabet",
      icon: "Icon",
      pictogram: "Pictogram",
      alphabetKeyboard: "ALPHABET KEYBOARD",
      iconKeyboard: "ICON KEYBOARD",
      pictogramKeyboard: "PICTOGRAM KEYBOARD",
      //Alerts
      deleteKeyboardTitle: "DELETE NEW KEYBOARD",
      deleteKeyboardMessage: "Are you sure that you like to DELETE this keyboard?",
      cancel: "Cancel",
      delete: "Delete",
      pictogramAlreadyAdded_T: "INVALID PICTOGRAM",
      pictogramAlreadyAdded: "Pictogram already added! Try another one!",

    },
  },
   /* Conditions for spanish translations */
  es: {
    translation: {
      //Menu tabs
      profile: "Perfil",
      back:"Atrás",
      settings: "Ajustes",
      addKeyboard: "Añadir teclado",
      //Keyboards
      alphabet: "Alfabeto",
      icon: "Icono",
      pictogram: "Pictograma",
      alphabetKeyboard: "TECLADO ALFABETICO",
      iconKeyboard: "TECLADO DE ICONOS",
      pictogramKeyboard: "TECLADO DE PICTOGRAMAS",
      //Alerts
      deleteKeyboardTitle: "ELIMINAR TECLADO NUEVO",
      deleteKeyboardMessage: "¿Estás seguro de que deseas ELIMINAR este teclado?",
      cancel: "Cancelar",
      delete: "Eliminar",
      pictogramAlreadyAdded_T: "PICTOGRAMA INVALIDO",
      pictogramAlreadyAdded: "¡El pictograma ya había sido añadido!¡Prueba otro!",
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
