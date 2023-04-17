import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  PixelRatio,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import AlphabetKeyboard from "../src/components/AlphabetKeyboard";
import IconKeyboard from "../src/components/IconKeyboard";
import SelectedItems from "../src/components/SelectedItems";
import PictogramKeyboard from "../src/components/PictogramKeyboard";
import AddKeyboard from "../src/components/AddKeyboard";
import CustomKeyboardContext from "../src/CustomKeyboardContext";
import ProfileTab from "../src/components/ProfileTab";
import "react-native-gesture-handler";
import CustomPictogramKeyboard from "../src/components/CustomPictogramKeyboard";

//import firebase from "./src/utils/Firebase";

const Drawer = createDrawerNavigator();

export default function Home() {
  const [showAlphabetKeyboard, setShowAlphabetKeyboard] = useState(true);
  const [showIconKeyboard, setShowIconKeyboard] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCustomKeyboard, setSelectedCustomKeyboard] = useState(null);
  const [keyboardTitle, setKeyboardTitle] = useState("Alphabet"); // Agrega esta línea para declarar el estado 'keyboardTitle' y su función de actualización 'setKeyboardTitle'

  const { customKeyboards, setCustomKeyboards } = useContext(
    CustomKeyboardContext
  );

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleDeleteItem = (index) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  {
    /* Here we change which keyboard we want to use */
  }
  /**
   * 
   * handleKeyboard function original. Con esto si que cambia.
   * 
   * 
   * const handleKeyboardChange = (keyboard) => {
    // Reboot all keyboards states
    setShowAlphabetKeyboard(false);
    setShowIconKeyboard(false);
    setShowPictogramKeyboard(false);

    switch (keyboard) {
      case "alphabet":
        setShowAlphabetKeyboard(true);
        break;
      case "icon":
        setShowIconKeyboard(true);
        break;
      case "pictogram":
        setShowPictogramKeyboard(true);
        break;
      default:
        break;
    }
  };
   *   
   */
  const handleKeyboardChange = (keyboardType) => {
    if (keyboardType.startsWith("custom-")) {
      const customKeyboardIndex = parseInt(keyboardType.split("-")[1]);
      const customKeyboard = customKeyboards[customKeyboardIndex];
      setKeyboardTitle(customKeyboard.title);
      setSelectedCustomKeyboard(customKeyboard);
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

  const [showPictogramKeyboard, setShowPictogramKeyboard] = useState(false);

  const handleDeleteLastItem = () => {
    const newItems = [...selectedItems];
    newItems.pop();
    setSelectedItems(newItems);
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
                  handleDelete={(index) => handleDeleteItem(index)}
                />
                {selectedItems.length > 0 && (
                  <TouchableOpacity
                    onPress={handleDeleteLastItem}
                    style={styles.deleteButton}
                  >
                    <Ionicons
                      name="ios-close-circle-outline"
                      size={24}
                      color="#ff0000"
                    />
                  </TouchableOpacity>
                )}
              </View>
              {/* Render the selected keyboard based on state */}
              {showAlphabetKeyboard && (
                <AlphabetKeyboard handlePress={handleAddItem} />
              )}
              {showIconKeyboard && <IconKeyboard handlePress={handleAddItem} />}
              {showPictogramKeyboard && (
                <PictogramKeyboard handlePress={handleAddItem} />
              )}
              {selectedCustomKeyboard && (
                <CustomPictogramKeyboard
                  title={selectedCustomKeyboard.title}
                  pictograms={selectedCustomKeyboard.pictograms}
                  handlePress={handleAddItem}
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
          {() => (
            <AddKeyboard
              handleSave={(keyboardTitle, selectedPictograms) => {
                // Lógica para guardar el nuevo teclado con su título y pictogramas seleccionados
                setCustomKeyboards([
                  ...customKeyboards,
                  { title: keyboardTitle, pictograms: selectedPictograms },
                ]);
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

/*function AddCategoryScreen({ navigation }) {
  
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Category tab</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
      <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}*/

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
  deleteButton: {
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
