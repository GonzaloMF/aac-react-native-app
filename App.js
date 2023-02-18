import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Keyboard from './src/components/Keyboard';
import MessageInput from './src/components/MessageInput';
import MessageList from './src/components/MessageList';

const App = () => {
  const [selectedText, setSelectedText] = useState('');
  const [messages, setMessages] = useState([]);

  const handleKeyPress = (key) => {
    setSelectedText(selectedText + key);
  };

  const handleSend = () => {
    setMessages([...messages, selectedText]);
    setSelectedText('');
  };

  const handleDelete = () => {
    setMessages(messages.slice(0, -1));
  };

  const handleMessagePress = (message) => {
    setSelectedText(message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.keyboardContainer}>
        <Keyboard keys={['A', 'B', 'C', 'D', 'E']} onKeyPress={handleKeyPress} selectedText={selectedText} />
      </View>
      <View style={styles.chatContainer}>
        <MessageInput selectedText={selectedText} onSend={handleSend} />
        <MessageList messages={messages} onMessagePress={handleMessagePress} />
      </View>
      {messages.length > 0 && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardContainer: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  deleteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#f00',
    borderRadius: 10,
    padding: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
