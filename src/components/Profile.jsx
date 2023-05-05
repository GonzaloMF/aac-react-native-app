import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";
// import { auth } from "../utils/Firebase";  // Uncomment if you use Firebase

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(auth.currentUser);

// Uncomment if you use Firebase
 /* const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  */

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileImage}
        source={{ uri: userData.photoURL }}
      />
      <Text style={styles.usernameText}>{userData.displayName}</Text>
      <Text style={styles.emailText}>{userData.email}</Text>
      <Text style={styles.bioText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
        bibendum eleifend felis, sed imperdiet metus ultricies id. 
      </Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  emailText: {
    color: "#777",
    fontSize: 16,
    marginBottom: 20,
  },
  bioText: {
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
