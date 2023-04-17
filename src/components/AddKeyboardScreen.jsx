import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

const AddKeyboard = ({ handleSave }) => {
  const [keyboardTitle, setKeyboardTitle] = useState("");
  const [pictograms, setPictograms] = useState([]);
  const [selectedPictograms, setSelectedPictograms] = useState([]);

  // Aquí puedes agregar todos los pictogramas disponibles localmente en el dispositivo
  // Debe ser una lista de objetos con la estructura { name: "picto1", image: require("../path/to/image.png") }
  const availablePictograms = [
    {
      name: "picto1",
      image: require("../images/chicken.png"),
    },
    {
      name: "picto2",
      image: require("../images/fish.png"),
    },
    // ...otros pictogramas
  ];

  const handlePictogramSelection = (pictogram) => {
    setSelectedPictograms([...selectedPictograms, pictogram]);
  };

  const handlePictogramDeselection = (index) => {
    const newSelectedPictograms = [...selectedPictograms];
    newSelectedPictograms.splice(index, 1);
    setSelectedPictograms(newSelectedPictograms);
  };

  const handleTitleChange = (text) => {
    setKeyboardTitle(text);
  };

  const handleSavePress = () => {
    handleSave(keyboardTitle, selectedPictograms);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD KEYBOARD</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleTitleChange}
        value={keyboardTitle}
        placeholder="Keyboard Title"
      />
      <FlatList
        data={availablePictograms}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePictogramSelection(item)}>
            <Image source={item.image} style={styles.image} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
        numColumns={4}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.selectedPictograms}>
        {selectedPictograms.map((pictogram, index) => (
          <TouchableOpacity
            key={pictogram.name}
            onPress={() => handlePictogramDeselection(index)}
          >
            <Image source={pictogram.image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSavePress}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "80%",
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  columnWrapper: {
    justifyContent: "center",
  },
  contentContainer: {
    justifyContent: "center",
  },
  selectedPictograms: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default AddKeyboard;
