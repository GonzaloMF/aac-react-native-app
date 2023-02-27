import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import IconPicker from "react-native-icon-picker";

const AddCategoryScreen = () => {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("");
  const [keyboard, setKeyboard] = useState("");
  const [image, setImage] = useState(null);

  const handleSave = () => {
    // Here I have to add the function to databse or maybe backend
    console.log(
      `Category added with the title: "${title}", icon: "${icon}" and keyboard: "${keyboard}".`
    );
  };

  const handleSelectImage = async () => {

    const permition = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
    if (permition.granted === false) {
      alert('We need to acces to your album.');
      return;
    }

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text>Icon:</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Picker
          style={{ flex: 1 }}
          selectedValue={icon}
          onValueChange={setIcon}
        >
          <Picker.Item name="ios-close-circle-outline" value="book-open" />
          <Picker.Item label="Comida" value="utensils" />
          <Picker.Item label="Ropa" value="tshirt" />
          {/* Agrega más opciones aquí */}
        </Picker>
        <Ionicons name="ios-close-circle-outline" size={30} color="#000" />
      </View>
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
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "left",
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
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#007aff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddCategoryScreen;
