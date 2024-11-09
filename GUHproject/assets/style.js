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
    articletext: {
      fontSize: 16,
      textAlign: 'center',
      fontFamily: 'ChopinScript',
      color: 'dark'
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
      width: 600,
      height: 600,
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
      justifyContent: 'center',
      minWidth: 300,
      minHeight: 300,
    },
    articleBox: {
      margin: '2%',
      borderRadius: 15,
      width: 330,
      height: 330,
      backgroundColor: '#F0F0F0',
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
      height: 265,
      width: 290,
      borderRadius: 3,
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
    textgen: {
      fontSize: 10,
      fontWeight: 'black',
      fontFamily: 'Helvetica',
      color: 'gray',
      marginBottom: 20,
    },

  });
export default styles;