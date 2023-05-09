import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useTranslation } from "react-i18next";

const IconKeyboard = ({ handlePress }) => {
  const icons = [
    "smile",
    "meh",
    "tired",
    "angry",
    "thumbs-down",
    "thumbs-up",
    "check",
    "walking",
    "hospital",
    "bed",
    "bicycle",
    "school",
    "pencil-alt",
    "phone",
    "football-ball",
    "basketball-ball",
    "table-tennis",
    "cat",
    "dog",
    "horse",
    "crow",
    "deaf",
    "blind",
    "utensils",
    "cookie",
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
      <ScrollView
        contentContainerStyle={styles.keyboard}
        showsVerticalScrollIndicator={false}
      >
        {icons.map((icon, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress({ type: "icon", name: icon })}
            style={styles.button}
          >
            <Icon name={icon} size={30} color="white" />
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    width: "80%",
  },
  button: {
    backgroundColor: "lightblue",
    padding: 8,
    margin: 6,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 60,
    minHeight: 60,
  },
});

export default IconKeyboard;
