import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
//import ImagesRepo from './src/components/ImagesRepo';

const images = [
  { source: require('./assets/images/chicken.png'), name: "Image 1" },
  { source: require('./assets/images/fish.png'), name: "Image 2" },
  { source:require('./assets/images/meat.png'), name: "Image 3" },
  // Add more images
];


const AACKeyboard = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const onImagePress = (image) => {
    setSelectedImages([...selectedImages, image]);
  };

  const onRemovePress = () => {
    setSelectedImages([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectedImagesContainer}>
        {selectedImages.map((image) => (
          <View key={image.id} style={styles.selectedImageContainer}>
            <Image style={styles.selectedImage} source={image.image} />
            <Text style={styles.selectedImageText}>{image.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.imagesContainer}>
        {images.map((image) => (
          <TouchableOpacity key={image.id} onPress={() => onImagePress(image)}>
            <Image style={styles.image} source={image.image} />
          </TouchableOpacity>
        ))}
      </View>
      {selectedImages.length > 0 && (
        <View style={styles.removeButtonContainer}>
          <TouchableOpacity onPress={onRemovePress}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedImagesContainer: {
    height: 100,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedImageContainer: {
    height: 80,
    width: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  selectedImage: {
    height: 50,
    width: 50,
  },
  selectedImageText: {
    fontSize: 12,
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
  image: {
    height: 50,
    width: 50,
    margin: 10,
  },
  removeButtonContainer: {
    height: 40,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  removeButtonText: {
    fontSize: 16,
    color: "red",
  },
});

export default AACKeyboard;
