import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Keyboard = ({ keys, onKeyPress, selectedText }) => {
  const handleKeyPress = (key) => {
    onKeyPress(key);
  };

  return (
    <View style={styles.container}>
      <View style={styles.keyContainer}>
        {keys.map((key, index) => (
          <TouchableOpacity
            key={index}
            style={styles.keyButton}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedText ? (
        <Text style={styles.selectedText}>{selectedText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  keyButton: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  keyText: {
    fontSize: 18,
  },
  selectedText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default Keyboard;
