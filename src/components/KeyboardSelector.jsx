import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import KeyboardButton from "./KeyboardButton";

const KeyboardSelector = ({
  handleKeyboardChange,
  showAlphabetKeyboard,
  showIconKeyboard,
  showPictogramKeyboard,
  customKeyboards,
}) => {
  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={styles.keyboardSelector}
      showsHorizontalScrollIndicator={false}
    >
      <KeyboardButton
        onPress={() => handleKeyboardChange({ type: "alphabet" })}
        selected={showAlphabetKeyboard}
        title="Alfabeto"
      />
      <KeyboardButton
        onPress={() => handleKeyboardChange({ type: "icon" })}
        selected={showIconKeyboard}
        title="Iconos"
      />
      <KeyboardButton
        onPress={() => handleKeyboardChange({ type: "pictogram" })}
        selected={showPictogramKeyboard}
        title="Pictogramas"
      />
      {customKeyboards.map((keyboard) => (
        <KeyboardButton
          key={keyboard.title}
          onPress={() => handleKeyboardChange(keyboard)}
          selected={keyboard.visible}
          title={keyboard.title}
        />
      ))}
      <KeyboardButton
        onPress={() => handleKeyboardChange({ type: "addKeyboard" })}
        title="Añadir"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  keyboardSelector: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default KeyboardSelector;
