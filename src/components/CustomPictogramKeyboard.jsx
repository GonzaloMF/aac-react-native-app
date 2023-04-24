import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomPictogramKeyboard = (props) => {
  const {
    title,
    pictograms,
    backgroundImage,
    handlePress,
    handleAddPictogram,
    handleRemovePictogram,
    showLocalPictograms,
    setShowLocalPictograms,
  } = props;

  const [localPictograms] = useState([
    {
      name: "meat",
      image: require("../images/meat.png"),
      type: "pictogram",
    },
    {
      name: "honey",
      image: require("../images/honey.png"),
      type: "pictogram",
    },
  ]);

  /* function to delete a selected pictogram in the new keyboard*/
  const handleRemovePictogramFromCustomKeyboard = (pictogramToRemove, handleRemovePictogram) => {
    Alert.alert(
      "Remove Pictogram",
      "Are you sure you want to DELETE this pictogram from the keyboard?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Remove",
          onPress: () => handleRemovePictogram(pictogramToRemove),
        },
      ],
      { cancelable: true }
    );
  };
  
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: backgroundImage }}
        style={styles.backgroundImage}
        resizeMode="contain"
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title.toUpperCase()}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowLocalPictograms(!showLocalPictograms)}
        >
          <Ionicons name="add-circle" size={30} color="blue" />
        </TouchableOpacity>
      </View>
      <View style={styles.keyboard}>
        {pictograms.map((pictogram) => (
          <TouchableOpacity
            key={pictogram.name}
            onPress={() => handlePress(pictogram)}
            onLongPress={() => handleRemovePictogramFromCustomKeyboard(pictogram, handleRemovePictogram)}
          >
            <Image source={pictogram.image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>

      {showLocalPictograms && (
        <View style={styles.localPictogramsContainer}>
          {localPictograms.map((pictogram) => (
            <TouchableOpacity
              key={pictogram.name}
              onPress={() => {
                handleAddPictogram(pictogram);
                setShowLocalPictograms(false);
              }}
              onLongPress={() => handleRemovePictogramFromCustomKeyboard(pictogram, handleRemovePictogram)}
            >
              <Image source={pictogram.image} style={styles.image} />
            </TouchableOpacity>
          ))}
        </View>
      )}
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
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addButton: {
    marginRight: 10,
    marginBottom:15,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
});

export default CustomPictogramKeyboard;
