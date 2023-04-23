import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomPictogramKeyboard = (props) => {
  const {
    title,
    pictograms,
    backgroundImage,
    handlePress,
    isAddingPictogram,
    setIsAddingPictogram,
  } = props;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: backgroundImage }}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
        blurRadius={1}
      />
      <Text style={styles.title}>{title.toUpperCase()}</Text>

      <View style={styles.addButtonWrapper}>
        <TouchableOpacity onPress={() => setIsAddingPictogram(!isAddingPictogram)}>
          <Ionicons name="ios-add-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.keyboard}>
        {pictograms.map((pictogram) => (
          <TouchableOpacity
            key={pictogram.name}
            onPress={() => handlePress(pictogram)}
          >
            <Image source={pictogram.image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
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
  addPictogramButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default CustomPictogramKeyboard;
