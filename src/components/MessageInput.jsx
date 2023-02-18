import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';

const MessageInput = ({ selectedText, onSend }) => {
  const handleSend = () => {
    if (selectedText) {
      onSend();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={selectedText}
        placeholder="Enter your message here"
        onChangeText={() => {}}
        editable={false}
      />
      <TouchableOpacity style={[styles.button, !selectedText && styles.buttonDisabled]} onPress={handleSend} disabled={!selectedText}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#0a0',
    borderRadius: 20,
    padding: 10,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MessageInput;
