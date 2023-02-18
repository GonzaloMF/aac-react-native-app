import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Communications from "react-native-communications";

const MainTest = () => {
  const [message, setMessage] = useState("");

  const characters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    ",",
    "?",
    "!",
    "-",
    "+",
    "/",
    "*",
    "=",
    "@",
    "$",
    "#",
    "&",
    "_",
    ":",
    ";",
    "(",
    ")",
  ];

  const handleKeyPress = (char) => {
    setMessage(message + char);
  };

  const handleBackspace = () => {
    setMessage(message.slice(0, -1));
  };

  const handleSend = () => {
    Communications.text("123-456-7890", message);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {message.length > 0 && (
          <TouchableOpacity
            style={styles.backspaceButton}
            onPress={handleBackspace}
          >
            <Icon name="backspace" size={24} />
          </TouchableOpacity>
        )}
        <Text style={styles.inputText}>{message}</Text>
      </View>
      <View style={styles.keyboardContainer}>
        {characters.map((char, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleKeyPress(char)}
          >
            {index === 26 ? (
              <Icon name="backspace" size={24} onPress={handleBackspace} />
            ) : (
              <Text style={styles.buttonText}>{char}</Text>
            )}
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.button} onPress={handleSend}>
          <Text style={styles.buttonText}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  inputContainer: {
    flexDirection: "row", // Change to 'row-reverse' to move delete button into left
    alignItems: "center",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  backspaceButton: {
    marginLeft: 10, // Change to marginRight if flexDirection changes into 'row-reverse'
  },
  inputText: {
    fontSize: 18,
  },
  keyboardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  button: {
    width: "23%",
    height: 50,
    margin: "1%",
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default MainTest;
