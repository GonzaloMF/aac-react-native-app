import React, { createContext, useState } from "react";

const CustomKeyboardContext = createContext();

export const CustomKeyboardProvider = ({ children }) => {
  const [customKeyboards, setCustomKeyboards] = useState([]);

  return (
    <CustomKeyboardContext.Provider value={{ customKeyboards, setCustomKeyboards }}>
      {children}
    </CustomKeyboardContext.Provider>
  );
};

export default CustomKeyboardContext;