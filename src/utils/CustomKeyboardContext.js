import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const CustomKeyboardContext = createContext();

export const CustomKeyboardProvider = ({ children }) => {
  const [customKeyboards, setCustomKeyboards] = useState([]);

  return (
    <CustomKeyboardContext.Provider value={{ customKeyboards, setCustomKeyboards }}>
      {children}
    </CustomKeyboardContext.Provider>
  );
};

/* functions to store the new keyboards added by the user */
export const storeCustomKeyboards = async (customKeyboards) => {
  try {
    const jsonValue = JSON.stringify(customKeyboards);
    await AsyncStorage.setItem("@custom_keyboards", jsonValue);
  } catch (error) {
    console.error("Error storing custom keyboards: ", error);
  }
};

export const loadCustomKeyboards = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@custom_keyboards");
    if (jsonValue) {
      return JSON.parse(jsonValue);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error loading custom keyboards: ", error);
    return [];
  }
};

/* ************************************************ */

export default CustomKeyboardContext;