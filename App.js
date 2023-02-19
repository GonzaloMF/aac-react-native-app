import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AlphabetKeyboard from './src/components/AlphabetKeyboard';
import IconKeyboard from './src/components/IconKeyboard';
import SelectedItems from './src/components/SelectedItems';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [showAlphabetKeyboard, setShowAlphabetKeyboard] = useState(true);
  const [showIconKeyboard, setShowIconKeyboard] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleKeyboardChange = () => {
    setShowAlphabetKeyboard(!showAlphabetKeyboard);
    setShowIconKeyboard(!showIconKeyboard);
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectedItemsContainer}>
        <SelectedItems
          items={selectedItems}
          handleDelete={() =>
            setSelectedItems(selectedItems.slice(0, selectedItems.length - 1))
          }
          onDelete={handleDelete}
        />
      </View>
      <View style={styles.keyboardContainer}>
        {showAlphabetKeyboard && (
          <AlphabetKeyboard handlePress={handleAddItem} />
        )}
        {showIconKeyboard && <IconKeyboard handlePress={handleAddItem} />}
        <TouchableOpacity onPress={handleKeyboardChange} style={styles.button}>
          <Text style={styles.buttonText}>
            {showAlphabetKeyboard
              ? 'Cambiar a teclado de iconos'
              : 'Cambiar a teclado de letras'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
});

