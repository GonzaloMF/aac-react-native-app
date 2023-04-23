import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";


const AddKeyboard = ({ handleSave, ...props }) => {
  const [keyboardTitle, setKeyboardTitle] = useState("");
  const [pictograms, setPictograms] = useState([]);
  const [selectedPictograms, setSelectedPictograms] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [symbols, setSymbols] = useState([]);

  const loadSymbols = async () => {
    const symbolDirectory = `${FileSystem.documentDirectory}images`;
    const { assets } = await FileSystem.readDirectoryAsync(symbolDirectory);
    const loadedSymbols = assets.map((asset) => ({
      name: asset.name,
      image: { uri: `${symbolDirectory}/${asset.name}` },
    }));
    setSymbols(loadedSymbols);
  };

  useEffect(() => {
    loadSymbols();
  }, []);


  /* Funcion para manejar la selección de imagen */
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

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
    handleSave(keyboardTitle, selectedPictograms, selectedImage);
    props.navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleTitleChange}
        value={keyboardTitle}
        placeholder="Keyboard Title"
      />
      {/* 
      
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
      
      */}
      
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
