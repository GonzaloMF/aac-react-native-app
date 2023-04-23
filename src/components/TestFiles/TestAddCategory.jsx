import React, { useState } from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import firebase from "../../utils/Firebase";


const AddCategoryScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  const handleSave = () => {
    // Here I have to add the function to databse or maybe backend
    if (title && selectedIcon) {
      firebase.database().ref('categories').push({
        title: title,
        icon: selectedIcon,
        customIcon: textInputValue,
      });
      setTitle('');
      setImage(null);
      setSelectedIcon(null);
      setPickerOpen(false);
    }
    console.log({
      title: title,
      icon: icon,
      keyboard: keyboard,
      image: image,
    });
    
  };

  const handleSelectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSelectIcon = (icon) => {
    setSelectedIcon(icon);
    setPickerOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleSelectImage}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Ionicons name="image-outline" size={50} color="#c4c4c4" />
        )}
      </TouchableOpacity>
      <View style={styles.pickerContainer}>
        <TouchableOpacity
          style={styles.pickerButton}
          onPress={() => setPickerOpen(!pickerOpen)}
        >
          <Text style={styles.pickerButtonText}>Select Icon</Text>
        </TouchableOpacity>
        {pickerOpen && (
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedIcon}
              onValueChange={(itemValue) => handleSelectIcon(itemValue)}
            >
              <Picker.Item label="Select an icon" value={null} />
              <Picker.Item label="⭐️" value="star" />
              <Picker.Item label="🍎" value="apple" />
            </Picker>
          </View>
        )}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Type a word or character"
        maxLength={1}
        onChangeText={(text) => setTitle(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    width: "100%",
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 8,
    width: "100%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pickerContainer: {
    width: "100%",
    marginBottom: 16,
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 8,
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#000",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 8,
    width: "100%",
    padding: 8,
  },
  button: {
    backgroundColor: "#0b5fff",
    padding: 16,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddCategoryScreen;
