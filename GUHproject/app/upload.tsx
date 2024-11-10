import React, { useState } from 'react';
import { Button, Image, View, Text, Platform,StyleSheet,ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from "../assets/style"
import axios ,{AxiosError} from 'axios';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

interface ImageResponse {
  generatedImage: string;
  jsonData:string;
}

interface ArticleData {
  article: string[];
  author: string;
  caption: string;
  date: string;
  title: string;
  tone: string;
}

const localstyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  authorAndDate: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    marginBottom: 10,
  },
  caption: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  articleContainer: {
    marginBottom: 20,
  },
  articleText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});



export default function Upload() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [jsonData,setjsonData] = useState<any>(null);

  const pickImage = async () => {
    console.log("pick image pressed");
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
      if (Platform.OS === "ios")
      {
        const base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {encoding: FileSystem.EncodingType.Base64})
        toBackend(base64Image,true)
      }
      else if(Platform.OS === "android"){
        toBackend(result.assets[0].uri,true)
      }
      else {
      toBackend(result.assets[0].uri,false);}
    }
  };

  const toBackend = async (b64Image:string|null|undefined,mobile:boolean) =>{
    console.log(b64Image)
    var ip;
    if (mobile)
    {
      ip = "http://10.205.212.240:5000/generate"
    }
    else
    {
      ip = "http://127.0.0.1:5000/generate"
    }
    try {
      const response = await axios.post<ImageResponse>(ip, {
        image: b64Image, // Send the base64 image string
      });
      console.log('Response:', response.data);
      setGeneratedImage(`data:image/png;base64,${response.data.generatedImage}`);
      console.log("image set");
      setjsonData(response.data.jsonData);
      if (jsonData){
        console.log("text set");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // Handle AxiosError
        if (error.response) {
          // Server responded with a status code outside the range of 2xx
          console.error('Server Error:', error.response.data);
          console.error('Status:', error.response.status);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          // No response was received
          console.error('No response received:', error.request);
        } else {
          // Some other Axios error
          console.error('Axios error:', error.message);
        }
      } else {
        // Handle non-AxiosError
        console.error('Unexpected error:', error);
      }
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
      {jsonData && <Text>${JSON.stringify(jsonData)}</Text>}
   
    </View>
    </View></ScrollView>
  );

  
}
