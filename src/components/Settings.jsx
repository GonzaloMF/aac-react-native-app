import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import i18n from '../utils/i18n';

const Settings = () => {
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Language</Text>
      <View style={styles.languageButtons}>
        <TouchableOpacity onPress={() => changeLanguage('en')} style={styles.languageButton}>
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeLanguage('es')} style={styles.languageButton}>
          <Text style={styles.buttonText}>Español</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  languageButtons: {
    flexDirection: 'row',
  },
  languageButton: {
    backgroundColor: '#3F51B5',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default Settings;
