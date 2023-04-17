import React, { useState, useEffect } from "react";
import {StyleSheet,Text,TouchableOpacity,View,useWindowDimensions,PixelRatio,Platform,ScrollView,} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {widthPercentageToDP,heightPercentageToDP,} from "react-native-responsive-screen";

import AlphabetKeyboard from "../src/components/AlphabetKeyboard";
import IconKeyboard from "../src/components/IconKeyboard";
import SelectedItems from "../src/components/SelectedItems";
import PictogramKeyboard from "../src/components/PictogramKeyboard";
import AddKeyboardScreen from "../src/components/AddKeyboardScreen";
import ProfileTab from "../src/components/ProfileTab";
import "react-native-gesture-handler";

const Drawer = createDrawerNavigator();

export default function Home() {
  const [showAlphabetKeyboard, setShowAlphabetKeyboard] = useState(true);
  const [showIconKeyboard, setShowIconKeyboard] = useState(false);
  const [showPictogramKeyboard, setShowPictogramKeyboard] = useState(false);
  const [customKeyboards, setCustomKeyboards] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const loadKeyboards = async () => {
      try {
        const keyboardsJSON = await AsyncStorage.getItem("keyboards");
        const keyboards = keyboardsJSON ? JSON.parse(keyboardsJSON) : [];
        setCustomKeyboards(keyboards);
      } catch (error) {
        console.error("Error while loading custom keyboards:", error);
      }
    };

    loadKeyboards();
  }, []);

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleDeleteItem = (index) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const handleAddScreen = async (keyboardTitle) => {
    try {
      const keyboardsJSON = await AsyncStorage.getItem("keyboards");
      const keyboards = keyboardsJSON ? JSON.parse(keyboardsJSON) : [];
      keyboards.push({ title: keyboardTitle, type: "custom", visible: false });
      await AsyncStorage.setItem("keyboards", JSON.stringify(keyboards));
      setCustomKeyboards(keyboards);
    } catch (error) {
      console.error("Error while saving new keyboard:", error);
    }
  };

  const handleKeyboardChange = (keyboard) => {
    setShowAlphabetKeyboard(false);
    setShowIconKeyboard(false);
    setShowPictogramKeyboard(false);
    setCustomKeyboards((prevKeyboards) =>
      prevKeyboards.map((k) => ({ ...k, visible: false }))
    );

    switch (keyboard.type) {
      case "alphabet":
        setShowAlphabetKeyboard(true);
        break;
      case "icon":
        setShowIconKeyboard(true);
        break;
      case "pictogram":
        setShowPictogramKeyboard(true);
        break;
      case "custom":
        setCustomKeyboards((prevKeyboards) =>
          prevKeyboards.map((k) =>
            k.title === keyboard.title ? { ...k, visible: true } : k
          )
        );
        break;
      case "addKeyboard":
        navigation.navigate("AddKeyboard", {
          handleAddKeyboard: handleAddScreen,
        });
        break;
      default:
        break;
    }
  };

  const handleDeleteLastItem = () => {
    const newItems = [...selectedItems];
    newItems.pop();
    setSelectedItems(newItems);
  };

  return (
    <NavigationContainer independent>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => (
          <ProfileTab
            {...props}
            keyboards={customKeyboards}
            onSelectKeyboard={handleKeyboardChange}
          />
        )}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        {customKeyboards.map((keyboard) => (
          <Drawer.Screen
            key={keyboard.title}
            name={keyboard.title}
            component={AddKeyboardScreen}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <SelectedItems items={selectedItems} onDeleteItem={handleDeleteItem} />
      </ScrollView>
      <View style={styles.keyboardContainer}>
        {showAlphabetKeyboard && (
          <AlphabetKeyboard onKeyPress={handleAddItem} />
        )}
        {showIconKeyboard && <IconKeyboard onKeyPress={handleAddItem} />}
        {showPictogramKeyboard && (
          <PictogramKeyboard onKeyPress={handleAddItem} />
        )}
        {customKeyboards.map(
          (keyboard) =>
            keyboard.visible && (
              <CustomKeyboard key={keyboard.title} onKeyPress={handleAddItem} />
            )
        )}
      </View>
      <TouchableOpacity
        onPress={handleDeleteLastItem}
        style={styles.deleteButton}
      >
        <Ionicons name="backspace-outline" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  keyboardContainer: {
    paddingBottom: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 25,
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 1000,
  },
});
