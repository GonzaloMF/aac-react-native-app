import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  PixelRatio,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import {
  storeCustomKeyboards,
  loadCustomKeyboards,
} from "../src/CustomKeyboardContext";

import * as Speech from "expo-speech";
import AlphabetKeyboard from "../src/components/AlphabetKeyboard";
import IconKeyboard from "../src/components/IconKeyboard";
import SelectedItems from "../src/components/SelectedItems";
import PictogramKeyboard from "../src/components/PictogramKeyboard";
import AddKeyboard from "../src/components/AddKeyboard";
import CustomKeyboardContext from "../src/CustomKeyboardContext";
import ProfileTab from "../src/components/ProfileTab";
import CustomPictogramKeyboard from "../src/components/CustomPictogramKeyboard";
import "react-native-gesture-handler";

//import firebase from "./src/utils/Firebase";

const Drawer = createDrawerNavigator();

export default function Home() {
  const [showAlphabetKeyboard, setShowAlphabetKeyboard] = useState(true);
  const [showIconKeyboard, setShowIconKeyboard] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCustomKeyboard, setSelectedCustomKeyboard] = useState(null);
  const [keyboardTitle, setKeyboardTitle] = useState("Alphabet"); // Agrega esta línea para declarar el estado 'keyboardTitle' y su función de actualización 'setKeyboardTitle'
  const [showPictogramKeyboard, setShowPictogramKeyboard] = useState(false);
  const [showLocalPictograms, setShowLocalPictograms] = useState(false);

  /* Load the new keyboards added when the app runs */
  const { customKeyboards, setCustomKeyboards } = useContext(
    CustomKeyboardContext
  );
  // Cargar teclados personalizados al iniciar la aplicación
  useEffect(() => {
    const loadKeyboards = async () => {
      const loadedKeyboards = await loadCustomKeyboards();
      setCustomKeyboards(loadedKeyboards);
    };

    loadKeyboards();
  }, []);

  // Guardar teclados personalizados cuando se actualice la lista
  useEffect(() => {
    storeCustomKeyboards(customKeyboards);
  }, [customKeyboards]);

  /* const for the speech-device implementation */
  const speak = (text) => {
    Speech.speak(text);
  };

  const speakAllItems = () => {
    const allText = selectedItems.map((item) => item.name).join(" ");
    speak(allText);
  };

  const handlePlayItem = (index) => {
    const selectedItem = selectedItems[index];
    speak(selectedItem.name);
  };
  /* ********************************************* */

  /*
   * const and funtionalities for letters and pictograms into the top-bar.
   * handleAddItem/Pictogram works when the user select the element on the keyboard
   * Delete options on the top-bar selection.
   */
  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
    speak(item.name);
  };

  const handleAddPictogram = (pictogram) => {
    setSelectedItems([...selectedItems, pictogram]);
    speak(pictogram.name);
  };

  const handleDeleteAllItems = () => {
    setSelectedItems([]);
  };
  const handleDeleteLastItem = () => {
    const newItems = [...selectedItems];
    newItems.pop();
    setSelectedItems(newItems);
  };
  /* ********************************************* */

  /* function to delete the new keyboard added by the user */
  const handleDeleteCustomKeyboard = (index) => {
    Alert.alert(
      "DELETE NEW KEYBOARD",
      "Are you sure that you like to DELETE this keyboard?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const newCustomKeyboards = [...customKeyboards];
            newCustomKeyboards.splice(index, 1);
            setCustomKeyboards(newCustomKeyboards);

            // Select the previuos keyboard when is removed
            if (index > 0) {
              handleKeyboardChange(`custom-${index - 1}`);
            } else if (newCustomKeyboards.length > 0) {
              handleKeyboardChange(`custom-0`);
            } else {
              // If there is not a new keyboard to preview, go to the main keyboard
              handleKeyboardChange("alphabet");
            }
          },
        },
      ]
    );
  };
  /* ********************************************* */
  /* functions that we will use to add pictograms into the new keyboard created */
  const handleAddPictogramToSelectedCustomKeyboard = async (pictogram) => {
    if (selectedCustomKeyboard) {
      const updatedPictograms = [...selectedCustomKeyboard.pictograms, pictogram];
      const updatedCustomKeyboard = {
        ...selectedCustomKeyboard,
        pictograms: updatedPictograms,
      };
  
      const updatedCustomKeyboards = customKeyboards.map((keyboard) =>
        keyboard.title === selectedCustomKeyboard.title
          ? updatedCustomKeyboard
          : keyboard
      );
      setCustomKeyboards(updatedCustomKeyboards);
    }
  };
  

  
  // Esta función actualiza la lista de customKeyboards y agrega 
  //el pictograma al teclado personalizado seleccionado actualmente.
  
  

  /* ********************************************* */

  /* Here we change which keyboard we want to use */
  const handleKeyboardChange = (keyboardType) => {
    if (keyboardType.startsWith("custom-")) {
      const customKeyboardIndex = parseInt(keyboardType.split("-")[1]);
      const customKeyboard = customKeyboards[customKeyboardIndex];
      setKeyboardTitle(customKeyboard.title);
      setSelectedCustomKeyboard(customKeyboard);

      // Ocultar todos los teclados predefinidos cuando se selecciona un teclado personalizado
      setShowAlphabetKeyboard(false);
      setShowIconKeyboard(false);
      setShowPictogramKeyboard(false);
    } else {
      // Restablecer el teclado personalizado seleccionado
      setSelectedCustomKeyboard(null);

      // Lógica existente para cambiar entre teclados predefinidos
      switch (keyboardType) {
        case "alphabet":
          setKeyboardTitle("Alphabet");
          setShowAlphabetKeyboard(true);
          setShowIconKeyboard(false);
          setShowPictogramKeyboard(false);
          break;
        case "icon":
          setKeyboardTitle("Icons");
          setShowAlphabetKeyboard(false);
          setShowIconKeyboard(true);
          setShowPictogramKeyboard(false);
          break;
        case "pictogram":
          setKeyboardTitle("Pictograms");
          setShowAlphabetKeyboard(false);
          setShowIconKeyboard(false);
          setShowPictogramKeyboard(true);
          break;
        default:
          break;
      }
    }
  };

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" options={{ title: "AACBoard" }}>
          {() => (
            <View style={styles.container}>
              <View style={styles.selectedItemsContainer}>
                <SelectedItems
                  items={selectedItems}
                  handlePlay={(index) => handlePlayItem(index)}
                />
                {/* Speech and delete buttons*/}
                {selectedItems.length > 0 && (
                  <TouchableOpacity
                    onPress={speakAllItems}
                    style={styles.navigationBarButtons}
                  >
                    <Ionicons name="ios-play" size={30} color="black" />
                  </TouchableOpacity>
                )}
                {selectedItems.length > 0 && (
                  <TouchableOpacity
                    onPress={handleDeleteLastItem}
                    style={styles.navigationBarButtons}
                  >
                    <Ionicons
                      name="ios-close-circle-outline"
                      size={30}
                      color="#ff0000"
                    />
                  </TouchableOpacity>
                )}
                {selectedItems.length > 0 && (
                  <TouchableOpacity
                    onPress={handleDeleteAllItems}
                    style={styles.navigationBarButtons}
                  >
                    <Ionicons name="ios-trash" size={30} color="#ff0000" />
                  </TouchableOpacity>
                )}
              </View>
              {/* Render the selected keyboard based on state */}
              {showAlphabetKeyboard && (
                <AlphabetKeyboard handlePress={handleAddItem} />
              )}
              {showIconKeyboard && (
                <IconKeyboard handlePress={handleAddPictogram} />
              )}
              {showPictogramKeyboard && (
                <PictogramKeyboard handlePress={handleAddPictogram} />
              )}
              {selectedCustomKeyboard && (
                <CustomPictogramKeyboard
                  title={selectedCustomKeyboard.title}
                  pictograms={selectedCustomKeyboard.pictograms}
                  backgroundImage={selectedCustomKeyboard.backgroundImage}
                  handlePress={handleAddItem}
                  handleAddPictogram={handleAddPictogramToSelectedCustomKeyboard}
                  showLocalPictograms={showLocalPictograms}
                  setShowLocalPictograms={setShowLocalPictograms}
                />
              )}

              {/* Crea la barra inferior fija */}
              <View style={styles.bottomBar}>
                <TouchableOpacity
                  onPress={() => handleKeyboardChange("alphabet")}
                  style={styles.bottomBarButton}
                >
                  <Text>Alphabet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleKeyboardChange("icon")}
                  style={styles.bottomBarButton}
                >
                  <Text>Icon</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleKeyboardChange("pictogram")}
                  style={styles.bottomBarButton}
                >
                  <Text>Pictogram</Text>
                </TouchableOpacity>
                {customKeyboards.map((customKeyboard, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleKeyboardChange(`custom-${index}`)}
                    onLongPress={() => handleDeleteCustomKeyboard(index)} // delete new keyboard
                    style={styles.bottomBarButton}
                  >
                    <Text>{customKeyboard.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Profile"
          component={ProfileTab}
          options={{ title: "Profile" }}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
        <Drawer.Screen name="AddKeyboard" options={{ title: "Add keyboard" }}>
          {(props) => (
            <AddKeyboard
              {...props} // Agrega esta línea para pasar todas las propiedades recibidas al componente AddKeyboard
              handleSave={(
                keyboardTitle,
                selectedPictograms,
                selectedImage
              ) => {
                // Lógica para guardar el nuevo teclado con su título, pictogramas seleccionados y la imagen seleccionada
                setCustomKeyboards([
                  ...customKeyboards,
                  {
                    title: keyboardTitle,
                    pictograms: selectedPictograms,
                    backgroundImage: selectedImage,
                  },
                ]);
                props.navigation.goBack(); // Modifica esta línea para utilizar las propiedades pasadas al componente
              }}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Profile tab</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Settings tab</Text>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  responsiveBox: {
    width: widthPercentageToDP(84.5),
    height: heightPercentageToDP(17),
    borderWidth: 2,
    borderColor: "orange",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  selectedItemsContainer: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  keyboardContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  navigationBarButtons: {
    marginLeft: 10,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    backgroundColor: "#e0e0e0",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomBarButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
