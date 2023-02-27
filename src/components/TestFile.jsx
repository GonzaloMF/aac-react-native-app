import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const pictograms = [
  {
    name: "picto1",
    icon: <MaterialCommunityIcons name="food" size={32} color="black" />,
  },
  {
    name: "picto2",
    icon: <MaterialCommunityIcons name="home" size={32} color="black" />,
  },
  {
    name: "picto3",
    icon: <MaterialCommunityIcons name="phone" size={32} color="black" />,
  },
  // Agrega todos los pictogramas que necesites en esta matriz
];

const PictogramKeyboard = ({ handlePress }) => {
  return (
    /*
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {pictograms.map((pictogram) => (
        <TouchableOpacity key={pictogram.name} onPress={() => handlePress(pictogram.name)}>
          {pictogram.icon}
        </TouchableOpacity>
      ))}
    </View>
    */
    <View style={styles.container}>
      <Text style={styles.title}>PICTOGRAM KEYBOARD</Text>
      <View style={styles.keyboard}>
        {pictograms.map((pictogram) => (
          <TouchableOpacity
            key={pictogram.name}
            onPress={() => handlePress(pictogram.name)}
          >
            {pictogram.icon}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PictogramKeyboard;
