import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import chicken from 'aac-react-native-app/assets/images/chicken.png';
import fish from 'aac-react-native-app/assets/images/fish.png';
import honey from 'aac-react-native-app/assets/images/honey.png';

const Dashboard = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => setSelectedImage(chicken)}
          style={{ margin: 10 }}
        >
          <Image source={chicken} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedImage(fish)}
          style={{ margin: 10 }}
        >
          <Image source={fish} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedImage(honey)}
          style={{ margin: 10 }}
        >
          <Image source={honey} />
        </TouchableOpacity>
      </View>
      {selectedImage && (
        <View
          style={{
            marginTop: 20,
            borderWidth: 2,
            borderColor: 'black',
            padding: 10,
          }}
        >
          <Image source={selectedImage} />
        </View>
      )}
    </View>
  );
};

export default Dashboard;
