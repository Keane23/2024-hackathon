import { StyleSheet } from 'react-native';
import {useFonts} from 'expo-font';
const [fontsLoaded] = useFonts({
  'ChopinScript': require('../assets/fonts/ChopinScript.ttf'), 
});
const styles = StyleSheet.create({
    title: {
      fontFamily: 'ChopinScript',
      fontSize: 50,
      textAlign: 'center',
      marginTop: 20,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f8f8',
    },
    button: {
      width: 60,
      height: 60,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4CAF50',
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
    },
    imageContainer: {
      width: 300,
      height: 300,
      borderColor: 'black',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    #row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },

  });
export default styles;