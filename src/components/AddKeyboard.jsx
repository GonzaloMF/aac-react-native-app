import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  Modal,
} from "react-native";
import * as FileSystem from "expo-file-system";
import CustomKeyboardContext from "../utils/CustomKeyboardContext";
import { useFocusEffect } from "@react-navigation/native";
import availablePictograms from "../utils/Pictograms";

const AddKeyboard = ({ handleSave, ...props }) => {
  const [keyboardTitle, setKeyboardTitle] = useState("");
  const [pictograms, setPictograms] = useState([]);
  const [selectedPictograms, setSelectedPictograms] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [symbols, setSymbols] = useState([]);
  const { customKeyboards } = useContext(CustomKeyboardContext);
  // Agrega un estado para controlar la visibilidad del modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const loadPictograms = () => {
    setPictograms(availablePictograms);
  };

  // Toggle the visibility of the symbols modal
  const toggleSymbolsVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Load the symbols from the file system
  const loadSymbols = async () => {
    const symbolDirectory = `${FileSystem.documentDirectory}images`;
    const { assets } = await FileSystem.readDirectoryAsync(symbolDirectory);
    const loadedSymbols = assets.map((asset) => ({
      name: asset.name,
      image: { uri: `${symbolDirectory}/${asset.name}` },
    }));
    setSymbols(loadedSymbols);
  };

  // Load symbols when the component is mounted
  useEffect(() => {
    //loadPictograms();
    loadSymbols();
  }, []);

  // with this useFocusEffect, the new keyboard tab will be clean when the user add one new.
  useFocusEffect(
    React.useCallback(() => {
      // Clean the state
      setKeyboardTitle("");
      setSelectedPictograms([]);
      setSelectedImage(null);
    }, [])
  );

  // Attribute 'isBackground' added to avoid duplicates
  const handlePictogramSelection = (pictogram) => {
    if (!selectedPictograms.find((p) => p.name === pictogram.name)) {
      setSelectedPictograms([
        ...selectedPictograms,
        { ...pictogram, isBackground: false },
      ]);
    }
  };

  // Remove the pictogram added by touching it
  const handlePictogramDeselection = (index) => {
    const newSelectedPictograms = [...selectedPictograms];
    newSelectedPictograms.splice(index, 1);
    setSelectedPictograms(newSelectedPictograms);
  };

  // Handle changes to the keyboard title
  const handleTitleChange = (text) => {
    setKeyboardTitle(text);
  };

  // Save the new keyboard and navigate back to the Home screen
  const handleSavePress = () => {
    if (
      !keyboardTitle ||
      keyboardTitle.trim() === "" ||
      customKeyboards.some((kb) => kb.title === keyboardTitle)
    ) {
      Alert.alert(
        "Error",
        "A new keyboard with this title already exists or is empty. Please choose a different title."
      );
      return;
    }
    handleSave(keyboardTitle, selectedPictograms, selectedImage);
    props.navigation.navigate("Home");
  };

  // Render the component
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD KEYBOARD</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleTitleChange}
        value={keyboardTitle}
        placeholder="Keyboard Title"
      />

      <TouchableOpacity
        style={[styles.imagePickerButton, styles.F]}
        onPress={toggleSymbolsVisibility}
      >
        <Text style={styles.symbolsButtonText}>Show local pictograms</Text>
      </TouchableOpacity>

      {/* Modal to display available pictograms */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleSymbolsVisibility}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleSymbolsVisibility}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            {/* FlatList to display available pictograms */}
            <FlatList
              data={availablePictograms}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handlePictogramSelection(item)}
                >
                  <Image source={item.image} style={styles.image} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.name}
              numColumns={4}
              columnWrapperStyle={styles.columnWrapper}
              contentContainerStyle={styles.contentContainer}
            />
          </View>
        </View>
      </Modal>
      <Text style={styles.actualKeyboardContent}>Actual keyboard content:</Text>
      <View style={styles.selectedPictogramsContainer}>
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
      </View>
      {/* Button to save the new keyboard */}
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
  imagePickerButton: {
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  image: {
    width: 70,
    height: 70,
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
    marginBottom: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  symbolsButton: {
    marginLeft: 10,
  },
  symbolsButtonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 5,
  },
  actualKeyboardContent: {
    alignSelf: "flex-start",
    marginLeft: 50,
    marginBottom: 10,
    fontWeight: "bold",
  },
  selectedPictogramsContainer: {
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    width: "90%",
  },
  selectedPictograms: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    width: "70%",
  },
  closeButton: {
    position: "absolute",
    top: "2%",
    right: "2%",
  },
  closeButtonText: {
    fontSize: 24,
  },
});

export default AddKeyboard;
