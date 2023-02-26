import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AlphabetKeyboard = ({ handlePress }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ALPHABETIC KEYBOARD</Text>
      <View style={styles.keyboard}>
        {alphabet.map((letter, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(letter)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AlphabetKeyboard;
