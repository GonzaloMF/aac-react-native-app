import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SelectedItems({ items, onDelete }) {
  const handleDelete = (index) => {
    onDelete(index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Seleccionados:</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(items.length - 1)}
        >
          <Ionicons name="ios-close-circle-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemButton}
            onPress={() => handleDelete(index)}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 5,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemButton: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  itemText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
