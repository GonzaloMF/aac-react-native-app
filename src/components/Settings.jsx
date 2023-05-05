import React, { useEffect, useState } from 'react'; //we use the useState hook to store the current language and the useEffect 
                                                  //hook to get the language stored when the component is mounted.
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../utils/i18n';

const Settings = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    getStoredLanguage();
  }, []);

  /* getStoredLanguage function gets the language stored in AsyncStorage and updates the state of the language */
  const getStoredLanguage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage !== null) {
        setLanguage(storedLanguage);
      }
    } catch (error) {
      console.error('Error getting stored language:', error);
    }
  };
   /* changeLanguage function is now asynchronous and saves the language to AsyncStorage 
   before displaying an alert to inform the user that the language has changed. */
  const changeLanguage = async (language) => {
    try {
      await AsyncStorage.setItem('language', language);
      setLanguage(language);
      i18n.changeLanguage(language);
      Alert.alert(
        language === 'en' ? 'Language changed' : 'Idioma cambiado',
        language === 'en' ? 'English selected' : 'Español seleccionado',
      );
    } catch (error) {
      console.error('Error storing language:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Language</Text>
      <View style={styles.languageButtons}>
        <TouchableOpacity
          onPress={() => changeLanguage('en')}
          style={styles.languageButton}
        >
          <Text style={styles.buttonText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => changeLanguage('es')}
          style={styles.languageButton}
        >
          <Text style={styles.buttonText}>Spanish</Text>
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
