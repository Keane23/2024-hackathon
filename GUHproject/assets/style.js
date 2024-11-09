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
    article_title: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    articlesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    articleBox: {
      width: '48%',
      margin: '1%',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: 'gray',
      overflow: 'hidden',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    articleContent: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    articleImage: {
      width: '100%',
      height: 100,
      marginBottom: 10,
    },
    articleTitle: {
      fontSize: 16,
      textAlign: 'center',
    },
    plusSign: {
      fontSize: 40,
      fontWeight: 'bold',
      color: 'gray',
    },

  });
export default styles;