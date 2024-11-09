import { Text, View } from "react-native";
import { Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  return (
    <Button
      title="Go to User Page"
      onPress={() => router.push('/user')} 
    />
  );
}
