import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DeleteButton from 'aac-react-native-app/src/components/DeleteButton.jsx';

const MessageList = ({ messages, onMessagePress, onDelete }) => {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <FlatList
      style={styles.container}
      data={messages}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.messageContainer}
          onPress={() => onMessagePress(item)}
        >
          <Text style={styles.messageText}>{item}</Text>
        </TouchableOpacity>
      )}
      ListFooterComponent={
        messages.length > 0 && <DeleteButton onPress={handleDelete} />
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    backgroundColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  messageText: {
    fontSize: 18,
  },
});

export default MessageList;
