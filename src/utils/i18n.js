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
      //Local pictograms
      i: "I",
      drink: "Drink",
      you: "You",
      play: "Play",
      readABook: "Read a book",
      school: "School",
      musicClass: "Music class",
      meat: "Meat",
      honey: "Honey",
      pasta: "Pasta",
      fishSoup: "Fish soup",
      cheese: "Cheese",
      fish: "Fish",
      yes: "Yes",
      after: "After",
      ilike: "Like",
      no: "No",
      now: "Now",
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
      //Local pictograms
      i: "Yo",
      drink: "Beber",
      you: "Tú",
      play: "Jugar",
      readABook: "Leer un libro",
      school: "Escuela",
      musicClass: "Clase de música",
      meat: "Carne",
      honey: "Miel",
      pasta: "Pasta",
      fishSoup: "Sopa de pescado",
      cheese: "Queso",
      fish: "Pescado",
      yes: "Sí",
      after: "Después",
      ilike: "Me gusta",
      no: "No",
      now: "Ahora",
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
