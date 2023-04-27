import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { CustomKeyboardProvider } from "./src/utils/CustomKeyboardContext";
import { auth } from "./src/utils/Firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import './src/utils/i18n';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <CustomKeyboardProvider>
      <NavigationContainer ACindependent={true}>
        <View style={styles.container}>
          <Stack.Navigator>
             {user ? (
            <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
          ) : (
            <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
          )}
           {/** 
            * <Stack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={HomeScreen}
            />*/} 
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </CustomKeyboardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
