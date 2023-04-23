
const AddCategoryScreen = () => {
  const [titulo, setTitulo] = useState("");
  const [icono, setIcono] = useState("");
  const [teclado, setTeclado] = useState("");

  const handleGuardar = () => {
   // Here I have to add the function to databse or maybe backend
    console.log(
      `Category added with the title: "${titulo}", icon: "${icono}" and keyboard: "${teclado}".`
    );
  };

  const handleSeleccionarImagen = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permiso.granted === false) {
      alert('Se requiere permiso para acceder a la galería de imágenes.');
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        placeholder="Título de la categoría"
        onChangeText={(text) => setTitulo(text)}
        value={titulo}
        style={{
          width: "80%",
          height: 40,
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
          marginBottom: 20,
        }}
      >
        <Picker
          selectedValue={icono}
          onValueChange={(itemValue, itemIndex) => setIcono(itemValue)}
          style={{ flex: 1 }}
        >
          <Picker.Item label="Seleccionar icono" value="" />
          <Picker.Item label="Icono 1" value="icono1" />
          <Picker.Item label="Icono 2" value="icono2" />
          <Picker.Item label="Icono 3" value="icono3" />
          {/* Agrega más opciones aquí */}
        </Picker>
        <Ionicons name="ios-close-circle-outline" size={30} color="#000" />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "80%",
          marginBottom: 20,
        }}
      >
        <Picker
          selectedValue={teclado}
          onValueChange={(itemValue, itemIndex) => setTeclado(itemValue)}
          style={{ flex: 1 }}
        >
          <Picker.Item label="Seleccionar teclado" value="" />
          <Picker.Item label="Teclado 1" value="teclado1" />
          <Picker.Item label="Teclado 2" value="teclado2" />
          <Picker.Item label="Teclado 3" value="teclado3" />
          {/* Agrega más opciones aquí */}
        </Picker>
        <Ionicons name="ios-close-circle-outline" size={30} color="#000" />
      </View>
      <Button title="Guardar" onPress={handleGuardar} />
    </View>
  );
};

export default AddCategoryScreen;
