import React, { useState } from 'react';
import { Button, Image, View, Text, Platform,Alert,ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from "../assets/style"
import axios from 'axios';

interface ImageResponse {
  generatedImage: string;
  jsonData:string;
}

export default function Upload() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [jsonData,setjsonData] = useState<any>(null);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("image set")
      setImageUri(result.assets[0].uri);
      console.log(result.assets[0].uri);
      toBackend(result.assets[0].uri);
    }
  };

  const toBackend = async (b64Image:string|null|undefined) =>{
    try {
      const response = await axios.post<ImageResponse>('http://127.0.0.1:5000/generate', {
        image: b64Image, // Send the base64 image string
      });
      console.log('Response:', response.data);
      setGeneratedImage(`data:image/png;base64,${response.data.generatedImage}`);
      console.log("image set");
      setjsonData(response.data.jsonData);
      if (jsonData){
        console.log("text set");
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }
 

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Choose Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginTop: 20 }} />}
      {generatedImage && <Image source={{ uri: generatedImage }} style={{ width: 200, height: 200, marginTop: 20 }} />}
      {generatedImage && <Text style={{ marginTop: 20 }}>Processed Image</Text>}
      {jsonData && <Text>text generated</Text>}
      {jsonData && <Text>{`Metadata: ${JSON.stringify(jsonData, null, 2)}`}</Text>}
    </View>
    </View></ScrollView>
  );
}
