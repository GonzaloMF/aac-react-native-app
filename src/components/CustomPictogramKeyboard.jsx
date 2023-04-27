import React, { useState, useEffect } from "react";
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
import { TextInput } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";

const CustomPictogramKeyboard = (props) => {
  const { t } = useTranslation();

  /* states and functions to storage a image/pictogram selected by the user */
  const [customPictogramName, setCustomPictogramName] = useState("");
  const [showCustomPictogramModal, setShowCustomPictogramModal] =
    useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  /* states to view the pictograms and Title selected by AddKeyboard */
  const [title, setTitle] = useState("");
  const [pictograms, setPictograms] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");

  const {
    handlePress,
    handleAddPictogram,
    handleRemovePictogram,
    showLocalPictograms,
    setShowLocalPictograms,
    selectedCustomKeyboard,
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

  useEffect(() => {
    if (selectedCustomKeyboard) {
      setTitle(selectedCustomKeyboard.title);
      setPictograms(selectedCustomKeyboard.pictograms);
      setBackgroundImage(selectedCustomKeyboard.backgroundImage);
    }
  }, [selectedCustomKeyboard]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], //change the aspect to square when you get the image (select a image and you have to crop),
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleAddCustomPictogram = (uri) => {
    if (!customPictogramName) {
      Alert.alert("Error", "Please enter a name for the custom pictogram");
      return;
    }

    const newPictogram = {
      name: customPictogramName,
      image: { uri: selectedImage },
      type: "pictogram",
    };

    handleAddPictogram(newPictogram);
    setCustomPictogramName("");
    setSelectedImage(null); // Clean pre-viwed image
  };

  const closeModal = () => {
    setShowCustomPictogramModal(false);
    setSelectedImage(null);
  };

  /* *************************************************** */

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
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      <View style={styles.titleContainer}>
        <TouchableOpacity
          style={styles.addPictogramButton}
          onPress={() => setShowLocalPictograms(!showLocalPictograms)}
        >
          <View style={styles.iconWithText}>
            <Ionicons name="add-circle" size={25} color="white" />
            <Text style={styles.addPictogramButtonText}>
              ADD LOCAL PICTOGRAMS
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addPictogramButton}
          onPress={() => setShowCustomPictogramModal(true)}
        >
          <View style={styles.iconWithText}>
            <Ionicons name="add-circle" size={25} color="white" />
            <Text style={styles.addPictogramButtonText}>IMPORT PICTOGRAM</Text>
          </View>
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
            <Text style={styles.namePictogram}>{t(pictogram.name)}</Text>
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
            closeModal();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Add Custom Pictogram</Text>
              <TouchableOpacity
                style={{ ...styles.button, backgroundColor: "#2196F3" }}
                onPress={pickImage}
              >
                <Text style={styles.textStyle}>Select Image</Text>
              </TouchableOpacity>
              <View style={styles.imagePreviewContainer}>
                {selectedImage && (
                  <Image
                    source={{ uri: selectedImage }}
                    style={styles.imagePreview}
                  />
                )}
                {!selectedImage && <View style={styles.emptyImagePreview} />}
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => setCustomPictogramName(text)}
                  value={customPictogramName}
                  placeholder="Enter here a name for the new pictogram"
                />
              </View>
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: "#2196F3",
                    marginRight: 10,
                  }}
                  onPress={() => {
                    closeModal();
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
                {selectedImage && (
                  <TouchableOpacity
                    style={{
                      ...styles.button,
                      backgroundColor: "#2196F3",
                      marginLeft: 10,
                    }}
                    onPress={() => {
                      handleAddCustomPictogram();
                      closeModal();
                    }}
                  >
                    <Text style={styles.textStyle}>Save</Text>
                  </TouchableOpacity>
                )}
              </View>
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
    maxHeight: 320, //Set the maximum height of the container to limit the number of rows
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
  addPictogramButtonText: {
    color: "#fff",
    fontSize: 13,
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
    marginBottom: 2,
  },
  namePictogram: {
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
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
  imagePreviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  imagePreview: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 1,
    borderRadius: 5,
  },
  emptyImagePreview: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#f0f0f0",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default CustomPictogramKeyboard;
