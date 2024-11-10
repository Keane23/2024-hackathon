import React, { useState } from 'react';
import { Button, Image, View, Text, Platform,Alert,ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from "../assets/style"
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing';
import axios from 'axios';

interface ImageResponse {
  generatedImage: string;
}

export default function Upload() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

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
      setGeneratedImage(`data:image/png;base64,${response.data.generatedImage}`);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }

  const downloadImage = async (uri: string|null) => {
    console.log("downloadimage called");
  if (!uri) {
    console.log("no image");
    Alert.alert('Error', 'No image to download');
    return;
  }

  try {
    if (Platform.OS === 'web') {
      // For web, create a download link with Blob
      const byteCharacters = atob(uri.split(',')[1]); // Decode base64 string
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        byteArrays.push(new Uint8Array(byteNumbers));
      }

      const blob = new Blob(byteArrays, { type: 'image/png' });
      const url = URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'downloaded_image.png';
      link.click();
      URL.revokeObjectURL(url);
    }
    else{
    // Define a local path where the image will be saved
    const path = FileSystem.documentDirectory + 'downloaded_image.png';

    // Write the base64 string to the file system
    await FileSystem.writeAsStringAsync(path, uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Notify the user that the image is saved
    Alert.alert('Success', `Image saved to ${path}`);

    // Optionally, you can share the file (using Expo Sharing)
    if (await Sharing.isAvailableAsync()) {
      Sharing.shareAsync(path);
    }}
  } catch (error) {
    console.error('Error saving image', error);
    console.log("failure")
    Alert.alert('Error', 'Failed to download image');
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
    </View>
    </View></ScrollView>
  );
}
