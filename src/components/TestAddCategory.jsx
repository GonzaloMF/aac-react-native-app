import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Unicons from "@iconscout/react-native-unicons";
import { Picker } from "@react-native-picker/picker";

const AgregarCategoriaScreen = () => {
  const [titulo, setTitulo] = useState("");
  const [icono, setIcono] = useState("book-open");
  const [teclado, setTeclado] = useState("teclado1");
  const [imagen, setImagen] = useState(null);

  const handleGuardar = () => {
    console.log({
      titulo: titulo,
      icono: icono,
      teclado: teclado,
      imagen: imagen,
    });
  };

  const handleSeleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permiso.granted === false) {
      alert("Se requiere permiso para acceder a la galería de imágenes.");
      return;
    }
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!resultado.cancelled) {
      setImagen(resultado.uri);
    }
  };

  return (
    <View>
      <Text>Titulo:</Text>
      <TextInput value={titulo} onChangeText={setTitulo} />
      <Text>Icono:</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Picker
          style={{ flex: 1 }}
          selectedValue={icono}
          onValueChange={setIcono}
        >
          <Picker.Item label="Libro" value="book-open" />
          <Picker.Item label="Comida" value="utensils" />
          <Picker.Item label="Ropa" value="tshirt" />
          {/* Agrega más opciones aquí */}
        </Picker>
        <Unicons.UilApps size={30} color="#000" />
      </View>
      <Text>Teclado:</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Picker
          style={{ flex: 1 }}
          selectedValue={teclado}
          onValueChange={setTeclado}
        >
          <Picker.Item label="Teclado 1" value="teclado1" />
          <Picker.Item label="Teclado 2" value="teclado2" />
          <Picker.Item label="Teclado 3" value="teclado3" />
          {/* Agrega más opciones aquí */}
        </Picker>
        <Unicons.UilKeyboard size={30} color="#000" />
      </View>
      <Text>Pictograma:</Text>
      {imagen && (
        <Image source={{ uri: imagen }} style={{ width: 200, height: 200 }} />
      )}
      <TouchableOpacity onPress={handleSeleccionarImagen}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Unicons.UilImage size={30} color="#000" />
          <Text style={{ marginLeft: 10 }}>Seleccionar imagen</Text>
        </View>
      </TouchableOpacity>
      <Button title="Guardar" onPress={handleGuardar} />
    </View>
  );
};

export default AgregarCategoriaScreen;
