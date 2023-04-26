import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-gesture-handler";

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
      image: require("../images/food/meat.png"),
      type: "pictogram",
    },
    {
      name: "honey",
      image: require("../images/food/honey.png"),
      type: "pictogram",
    },
  ]);

  const [customPictogramName, setCustomPictogramName] = useState("");
  const [showCustomPictogramModal, setShowCustomPictogramModal] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      handleAddCustomPictogram(result.uri);
    }
  };

  const handleAddCustomPictogram = (uri) => {
    if (!customPictogramName) {
      Alert.alert("Error", "Please enter a name for the custom pictogram");
      return;
    }

    const newPictogram = {
      name: customPictogramName,
      image: { uri },
      type: "pictogram",
    };

    handleAddPictogram(newPictogram);
    setCustomPictogramName("");
  };

  const handleRemovePictogramFromCustomKeyboard = (
    pictogramToRemove,
    handleRemovePictogram
  ) => {
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
          style={styles.addPictogramButton}
          onPress={() => setShowLocalPictograms(!showLocalPictograms)}
        >
          <Ionicons name="add-circle" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addPictogramButton}
          onPress={() => setShowCustomPictogramModal(true)}
        >
          <Text style={styles.addPictogramButtonText}>Add pictogram</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.keyboard}>
        {pictograms.map((pictogram) => (
          <TouchableOpacity
            key={pictogram.name}
            onPress={() => handlePress(pictogram)}
            onLongPress={() =>
              handleRemovePictogramFromCustomKeyboard(
                pictogram,
                handleRemovePictogram
              )
            }
          >
            <Image source={pictogram.image} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>

      {showLocalPictograms && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showLocalPictograms}
          onRequestClose={() => {
            setShowLocalPictograms(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Select a local pictogram</Text>
              <View style={styles.localPictogramsContainer}>
                <ScrollView
                  contentContainerStyle={styles.localPictogramsScrollView}
                  horizontal={false}
                  showsVerticalScrollIndicator={false}
                >
                  {localPictograms.map((pictogram) => (
                    <TouchableOpacity
                      key={pictogram.name}
                      onPress={() => {
                        handleAddPictogram(pictogram);
                        setShowLocalPictograms(false);
                      }}
                      onLongPress={() =>
                        handleRemovePictogramFromCustomKeyboard(
                          pictogram,
                          handleRemovePictogram
                        )
                      }
                    >
                      <Image
                        source={pictogram.image}
                        style={styles.localImage}
                      />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setShowLocalPictograms(false);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {showCustomPictogramModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showCustomPictogramModal}
          onRequestClose={() => {
            setShowCustomPictogramModal(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Add Custom Pictogram</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => setCustomPictogramName(text)}
                value={customPictogramName}
                placeholder="Enter custom pictogram name"
              />
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: "#2196F3" }}
                onPress={pickImage}
              >
                <Text style={styles.textStyle}>Select Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setShowCustomPictogramModal(false);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  localImage: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  localPictogramsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    maxHeight: 320, // Ajusta la altura máxima del contenedor para limitar la cantidad de filas
  },
  localPictogramsScrollView: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  addPictogramButton: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "50%",
    maxHeight: "50%",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    marginTop: 10,
    width: "80%",
  },
});

export default CustomPictogramKeyboard;