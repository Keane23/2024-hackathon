import React, { useState } from 'react';
import { Button, Image, View, Text, Platform,StyleSheet,ScrollView,Alert} from 'react-native';
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
  const [pdfGenerated, setPdfGenerated] = useState(false);

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
  
  const generateHTML = async () => {
    if (!jsonData) {
      Alert.alert('Error', 'No article data available.');
      return;
    }
  
    const imageBase64 = generatedImage ? generatedImage.split(",")[1] : "";
  
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              margin: 0;
              background-color: #ffffff;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .container {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
            }
            .title {
              font-size: 36px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 10px;
            }
            .author-date {
              font-size: 14px;
              color: gray;
              text-align: center;
              margin-bottom: 20px;
            }
            .image {
              width: 100%;
              height: auto;
              max-width: 500px;
              margin-bottom: 20px;
              margin-left: auto;
              margin-right: auto;
              display: block;
            }
            .caption {
              font-size: 16px;
              text-align: center;
              margin-bottom: 20px;
              font-style: italic;
            }
            .article-content {
              font-size: 16px;
              line-height: 24px;
              margin-bottom: 10px;
            }
            .article-text {
              margin-bottom: 15px;
              padding-left: 20px;
              padding-right: 20px;
              text-align: justify;
            }
            .button-container {
              display: flex;
              justify-content: center;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="title">${jsonData.title}</h1>
            <p class="author-date">${jsonData.author} - ${jsonData.date}</p>
            ${generatedImage ? `<img class="image" src="data:image/png;base64,${imageBase64}" />` : ''}
            <p class="caption">${jsonData.caption}</p>
            <div class="article-content">
              ${jsonData.article.map((entry: string) => `<p class="article-text">${entry}</p>`).join('')}
            </div>
            <div class="button-container">
              <button onclick="window.print()">Print Article</button>
            </div>
          </div>
        </body>
      </html>
    `;
  
    if (Platform.OS === 'web') {
      // Web platform: Create a downloadable link
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = jsonData.title+ '.html'; // Trigger the download with the file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up the object URL
    } else {
      // Native platforms: Save file and share
      const fileUri = FileSystem.documentDirectory + jsonData.title+ '.html';
      await FileSystem.writeAsStringAsync(fileUri, htmlContent, { encoding: FileSystem.EncodingType.UTF8 });
      await Sharing.shareAsync(fileUri);
    }
  };
  

  if (!jsonData)
  {return (
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
  else
  {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={localstyles.container}>
          {/* Title */}
          <Text style={localstyles.title}>{jsonData.title}</Text>
  
          {/* Author and Date */}
          <Text style={localstyles.authorAndDate}>{jsonData.author} - {jsonData.date}</Text>
  
          {/* Image with Caption */}
          {generatedImage && (
            <Image source={{ uri: generatedImage }} style={localstyles.image} />
          )}
          <Text style={localstyles.caption}>{jsonData.caption}</Text>
  
          {/* Article Content */}
          <View style={localstyles.articleContainer}>
            {jsonData.article.map((entry: string, index: number) => (
              <Text key={index} style={localstyles.articleText}>{entry}</Text>
            ))}
          </View>
          {/* Generate PDF Button (only displayed after article data is loaded) */}
          {!pdfGenerated && (
            <Button title="Generate HTML" onPress={generateHTML} />
          )}

          {/* Message after PDF is generated */}
          {pdfGenerated && <Text style={{ color: 'green', textAlign: 'center' }}>PDF generated successfully!</Text>}
        </ScrollView>
      </View>
    );
  }
}
  

