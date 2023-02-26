import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SelectedItems = ({ items, handleDelete }) => {
  const lastItem = items.length > 0 ? items[items.length - 1] : null;
  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => handleDelete(index)}
          >
            <Text style={styles.itemText}>{item}</Text>
           
          </TouchableOpacity>
        ))}
      </View>
      {/* {lastItem ? (
        <View style={styles.lastItemContainer}>
          <Text style={styles.lastItemText}>Último elemento: {lastItem}</Text>
          <Ionicons
            name="ios-close-circle"
            size={20}
            color="#FF0000"
            onPress={() => handleDelete(items.length - 1)}
          />
        </View>
      ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    marginRight: 10,
  },
  lastItemContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastItemText: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default SelectedItems;
