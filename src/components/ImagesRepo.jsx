import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const pictograms = [
  {
    name: "picto1",
    image: require("../images/chicken.png"),
  },
  {
    name: "picto2",
    image: require("../images/fish.png"),
  },
  {
    name: "picto3",
    image: require("../images/honey.png"),
  },
  {
    name: "picto4",
    image: require("../images/egg-shell.png"),
  },
  {
    name: "picto5",
    image: require("../images/meat.png"),
  },

  // Agrega todos los pictogramas que necesites en esta matriz
]; 

const PictogramKeyboard = ({ handlePress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PICTOGRAM KEYBOARD</Text>
      <View style={styles.keyboard}>
        {pictograms.map((pictogram) => (
          <TouchableOpacity
            key={pictogram.name}
            onPress={() => handlePress(pictogram.name)}
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
});

export default PictogramKeyboard;
