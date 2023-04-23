import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Image } from 'react-native';
import firebase from '../../utils/Firebase';

export default function PictogramKeyboard({ handlePress }) {

  const [pictograms, setPictograms] = useState([]);

  useEffect(() => {
    const pictogramsRef = firebase.database().ref('pictograms');
    pictogramsRef.on('value', (snapshot) => {
      const pictogramsData = snapshot.val();
      const pictogramsArray = Object.keys(pictogramsData).map((key) => {
        return {
          id: key,
          ...pictogramsData[key],
        };
      });
      setPictograms(pictogramsArray);
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.text)} style={styles.item}>
      <Image style={styles.image} source={{ uri: item.image }} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={pictograms}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
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
  item: {
    flex: 1,
    margin: 10,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
