import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getStoredLanguage } from "../components/test/i18n_test";

/* Conditions for english translation */
const resources = {
  en: {
    translation: {
      //Menu tabs and functions
      profile: "Profile",
      back:"Back",
      settings: "Settings",
      addKeyboard: "Add Keyboard",
      save: "Save",
      //Keyboards
      alphabet: "Alphabet",
      icon: "Icon",
      pictogram: "Pictogram",
      alphabetKeyboard: "ALPHABET KEYBOARD",
      iconKeyboard: "ICON KEYBOARD",
      pictogramKeyboard: "PICTOGRAM KEYBOARD",
      showLocalPictograms: "Show local pictograms",
      actualKeyboardContent: "Actual Keyboard content:",
      importLocalPictogram: "ADD LOCAL PICTOGRAMS",
      importPictogram: "IMPORT PICTOGRAMS",
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
      error: "Error",
      newKeyboardAlert: "A new keyboard with this title already exists or is empty. Please choose a different title.",
      deleteKeyboardTitle: "DELETE NEW KEYBOARD",
      deleteKeyboardMessage: "Are you sure that you like to DELETE this keyboard?",
      deletePictogramTitle: "REMOVE PICTOGRAM",
      deletePictohramMessage: "Are you sure you want to DELETE this pictogram selected?",
      cancel: "Cancel",
      delete: "Delete",
      pictogramAlreadyAdded_T: "INVALID PICTOGRAM",
      pictogramAlreadyAdded: "Pictogram already added! Try another one!",

    },
  },
   /* Conditions for spanish translations */
  es: {
    translation: {
      //Menu tabs and functions
      profile: "Perfil",
      back:"Atrás",
      settings: "Ajustes",
      addKeyboard: "Añadir teclado",
      save: "Guardar",
      //Keyboards
      alphabet: "Alfabeto",
      icon: "Icono",
      pictogram: "Pictograma",
      alphabetKeyboard: "TECLADO ALFABETICO",
      iconKeyboard: "TECLADO DE ICONOS",
      pictogramKeyboard: "TECLADO DE PICTOGRAMAS",
      showLocalPictograms: "Pictogramas locales",
      actualKeyboardContent: "Contenido del teclado actual:",
      importLocalPictogram: "AÑADE PICTOGRAMAS LOCALES",
      importPictogram: "IMPORTA PICTOGRAMAS",
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
      error: "Error",
      newKeyboardAlert: "Ya existe un nuevo teclado con este título o está vacío. Por favor, elija un título diferente.",
      deleteKeyboardTitle: "ELIMINAR TECLADO NUEVO",
      deleteKeyboardMessage: "¿Estás seguro de que deseas ELIMINAR este teclado?",
      deletePictogramTitle: "ELIMINAR PICTOGRAMA",
      deletePictohramMessage: "¿Estás seguro que quieres ELIMINAR el pictograma seleccionado?",
      cancel: "Cancelar",
      delete: "Eliminar",
      pictogramAlreadyAdded_T: "PICTOGRAMA INVALIDO",
      pictogramAlreadyAdded: "¡El pictograma ya había sido añadido!¡Prueba otro!",
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources,
  lng: "en",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
