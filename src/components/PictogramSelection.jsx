import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const PictogramSelectionScreen = ({ availablePictograms, handleSelect }) => {
  const navigation = useNavigation();

  const handlePictogramPress = (pictogram) => {
    handleSelect(pictogram);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Pictogram</Text>
      <FlatList
        data={availablePictograms}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePictogramPress(item)}>
            <Image source={item.image} style={styles.image} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
        numColumns={4}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  image: {
    width: 80,
    height: 80,
    margin: 5,
  },
  columnWrapper: {
    justifyContent: "center",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
});

export default PictogramSelectionScreen;
