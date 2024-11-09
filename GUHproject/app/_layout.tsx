
import {Stack} from 'expo-router'


export default function RootLayout() {
  return (
    <>
    <Stack>
      <Stack.Screen name="Index"  options={{ title: 'Projects'}}/>
      <Stack.Screen name="Article" options={{ title: 'Article'}}/>
      <Stack.Screen name="Upload" options={{ title: 'Upload'}}/>
    </Stack>
    </>
  );
}
