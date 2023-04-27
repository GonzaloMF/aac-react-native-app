import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTranslation } from "react-i18next";

const IconKeyboard = ({ handlePress }) => {
  const icons = [
    "smile",
    "smile-beam",
    "smile-wink",
    "tired",
    "sad-tear",
    "angry",
    "thumbs-down",
    "thumbs-up",
    "check",
    "hospital",
    "bed",
    "bicycle",
    "blind",
    "pencil-alt",
    "phone",
    "football-ball",
    "basketball-ball",
    "table-tennis",
    "cat",
    "dog",
    "horse",
    "kiwi-bird",
    "utensils",
    "cookie",
    "walking",
    "water",
    "home",
    "car",
    "music",
    "wind",
  ];

  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("iconKeyboard")}</Text>
      <View style={styles.keyboard}>
        {icons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress({ type: "icon", name: icon })}
            style={styles.button}
          >
            <Icon name={icon} size={30} color="white" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "80%", // Ajustar el ancho del teclado al tamaño de la pantalla
  },
  button: {
    backgroundColor: "lightblue",
    padding: 8, // Aumentar el padding
    margin: 6, // Aumentar el margen
    borderRadius: 5,
    justifyContent: "center", // Centrar verticalmente el ícono
    alignItems: "center",
    minWidth: 60, // Establecer un ancho mínimo para los botones
    minHeight: 60, // Establecer una altura mínima para los botones
  },
});

export default IconKeyboard;
