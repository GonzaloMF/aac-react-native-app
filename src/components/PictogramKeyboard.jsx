import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import storage from '@react-native-firebase/storage';

const pictograms = [
  {
    name: "picto1",
    path: "pictograms/chicken.png", // Ruta a la imagen en Firebase Storage
  },
  {
    name: "picto2",
    path: "pictograms/fish.png", // Ruta a la imagen en Firebase Storage
  },
  {
    name: "picto3",
    path: "pictograms/meat.png", // Ruta a la imagen en Firebase Storage
  },
  // Agrega todos los pictogramas que necesites en esta matriz
]; 

const PictogramKeyboard = ({ handlePress }) => {
  const [pictogramImages, setPictogramImages] = useState([]);

  useEffect(() => {
    // Función que carga las imágenes desde Firebase Storage
    const loadImages = async () => {
      const images = await Promise.all(pictograms.map(async (pictogram) => {
        const ref = storage().ref(pictogram.path);
        const url = await ref.getDownloadURL();
        return {
          name: pictogram.name,
          url,
        };
      }));
      setPictogramImages(images);
    };
    loadImages();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PICTOGRAM KEYBOARD</Text>
      <View style={styles.keyboard}>
        {pictogramImages.map((pictogram) => (
          <TouchableOpacity
            key={pictogram.name}
            onPress={() => handlePress(pictogram.name)}
          >
            <Image source={{ uri: pictogram.url }} style={styles.image} />
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
