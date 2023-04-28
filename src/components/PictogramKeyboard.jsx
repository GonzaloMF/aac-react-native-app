import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";

const pictograms = [
  {
    name: "i",
    image: require("../images/actions/yo.png"),
    type: "pictogram",
  },
  {
    name: "drink",
    image: require("../images/actions/drink.png"),
    type: "pictogram",
  },
  {
    name: "you",
    image: require("../images/actions/tu.png"),
    type: "pictogram",
  },
  {
    name: "play",
    image: require("../images/actions/jugar.png"),
    type: "pictogram",
  },
  {
    name: "readABook",
    image: require("../images/school/read.png"),
    type: "pictogram",
  },
  {
    name: "school",
    image: require("../images/school/school.png"),
    type: "pictogram",
  },
  {
    name: "musicClass",
    image: require("../images/school/music.png"),
    type: "pictogram",
  },
  {
    name: "yes",
    image: require("../images/actions/yes.png"),
    type: "pictogram",
  },
  {
    name: "after",
    image: require("../images/actions/after.png"),
    type: "pictogram",
  },
  {
    name: "ilike",
    image: require("../images/actions/ilike.png"),
    type: "pictogram",
  },
  {
    name: "no",
    image: require("../images/actions/no.png"),
    type: "pictogram",
  },
  {
    name: "now",
    image: require("../images/actions/now.png"),
    type: "pictogram",
  },
];

const PictogramKeyboard = ({ handlePress }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("pictogramKeyboard")}</Text>
      <FlatList
        data={pictograms}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.pictogramContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.namePictogram}>{t(item.name)}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={6}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  namePictogram: {
    textAlign: "center",
  },
  listContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  pictogramContainer: {
    marginBottom: 10,
    alignItems: "center",
  },
});

export default PictogramKeyboard;
