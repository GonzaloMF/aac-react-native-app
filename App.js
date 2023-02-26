import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import AlphabetKeyboard from './src/components/AlphabetKeyboard';
import IconKeyboard from './src/components/IconKeyboard';
import SelectedItems from './src/components/SelectedItems';
import AddCategoryScreen from './src/components/AddCategoryScreen';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

export default function App() {
  const [showAlphabetKeyboard, setShowAlphabetKeyboard] = useState(true);
  const [showIconKeyboard, setShowIconKeyboard] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleDeleteItem = (index) => {
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const handleKeyboardChange = () => {
    setShowAlphabetKeyboard(!showAlphabetKeyboard);
    setShowIconKeyboard(!showIconKeyboard);
  };

  const handleDeleteLastItem = () => {
    const newItems = [...selectedItems];
    newItems.pop();
    setSelectedItems(newItems);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" options={{ title: 'AACBoard' }}>
          {() => (
            <View style={styles.container}>
              <View style={styles.selectedItemsContainer}>
                <SelectedItems
                  items={selectedItems}
                  handleDelete={(index) => handleDeleteItem(index)}
                />
                {selectedItems.length > 0 && (
                  <TouchableOpacity onPress={handleDeleteLastItem} style={styles.deleteButton}>
                    <Ionicons name="ios-close-circle-outline" size={24} color="#ff0000" />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.keyboardContainer}>
                {showAlphabetKeyboard && (
                  <AlphabetKeyboard handlePress={handleAddItem} />
                )}
                {showIconKeyboard && <IconKeyboard handlePress={handleAddItem} />}
                <TouchableOpacity onPress={handleKeyboardChange} style={styles.button}>
                  <Text style={styles.buttonText}>
                    {showAlphabetKeyboard
                      ? 'Change to icon keyboard'
                      : 'Change to alphabetic keyboard'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Drawer.Screen>
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
        <Drawer.Screen name="AddCategory" component={AddCategoryScreen} options={{ title: 'Add category' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Profile tab</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>Settings tab</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedItemsContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  keyboardContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  deleteButton: {
    marginLeft: 10,
  },
});