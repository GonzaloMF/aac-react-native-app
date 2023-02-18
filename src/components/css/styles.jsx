import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectedImagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  selectedImage: {
    marginRight: 10,
  },
  selectedImageIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default styles;
