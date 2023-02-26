import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const IconKeyboard = ({ handlePress }) => {
  const icons = [
    'smile-o',
    'frown-o',
    'thumbs-o-up',
    'star-o',
    'heart-o',
    'check',
    'exclamation',
    'question',
    'pencil',
    'phone',
    'envelope',
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ICON KEYBOARD</Text>
      <View style={styles.keyboard}>
        {icons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(icon)}
            style={styles.button}
          >
            <Icon name={icon} size={24} color="white" />
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
});

export default IconKeyboard;
