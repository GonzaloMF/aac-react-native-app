import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const pictograms = [
  {
    name: "I",
    image: require("../images/actions/yo.png"),
    type: "pictogram",
  },
  {
    name: "drink",
    image: require("../images/actions/beber.png"),
    type: "pictogram",
  },
  {
    name: "you",
    image: require("../images/actions/tu.png"),
    type: "pictogram",
  },
  {
    name: "play",
    image: require("../images/actions/jugar.png"),
    type: "pictogram",
  },
  {
    name: "read a book",
    image: require("../images/school/read.png"),
    type: "pictogram",
  },
  {
    name: "school",
    image: require("../images/school/school.png"),
    type: "pictogram",
  },
  {
    name: "music class",
    image: require("../images/school/music.png"),
    type: "pictogram",
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
});

export default PictogramKeyboard;
