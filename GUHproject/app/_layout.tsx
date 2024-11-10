
import {Stack} from 'expo-router';
import {Text,View} from 'react-native';
import {useFonts} from 'expo-font';
import React,{useEffect} from 'react';
import styles from '@/assets/style';


export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    'ChopinScript': require('../assets/fonts/ChopinScript.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      console.log('Fonts are loaded!');
    }
  }, [fontsLoaded]);

  // If fonts are not loaded, show a loading screen
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }
  return (
    <Stack>
      <Stack.Screen name="index"  options={{ title: 'Projects'}}/>
      <Stack.Screen name="article" options={{ title: 'Article'}}/>
      <Stack.Screen name="upload" options={{ title: 'Upload'}}/>
    </Stack>
  );
}
