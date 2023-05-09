import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { useTranslation } from "react-i18next";

const AlphabetKeyboard = ({ handlePress }) => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?".split('');
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("alphabetKeyboard")}</Text>
      <ScrollView
        contentContainerStyle={styles.keyboard}
        showsVerticalScrollIndicator={false}
      >
        {alphabet.map((letter, index) => (
          <View key={index} style={styles.gridItem}>
            <TouchableOpacity
              onPress={() => handlePress({ name: letter, type: 'alphabet' })}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{letter}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
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
    width: '80%',
  },
  gridItem: {
    width: '20%', // 5 columns
    aspectRatio: 2.1, // Keep the width and height equal
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '80%',
    height: '80%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AlphabetKeyboard;
