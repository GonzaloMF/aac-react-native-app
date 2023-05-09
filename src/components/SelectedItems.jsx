import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';


const SelectedItems = ({ items, handlePlay }) => {
  const lastItem = items.length > 0 ? items[items.length - 1] : null;
  return (
    <View style={styles.container}>
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.itemContainer}
            onPress={() => handlePlay(index)}
          >
            {item.type === "icon" ? (
              <Icon name={item.name} size={24} color="black" />
            ) : item.type === "pictogram" ? (
              <Image source={item.image} style={styles.itemImage} />
            ) : (
              <Text style={styles.itemText}>{item.name}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
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
  itemImage: {
    width: 24,
    height: 24,
  },
});

export default SelectedItems;
