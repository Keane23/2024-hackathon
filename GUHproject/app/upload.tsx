import React, { useState } from 'react';
import { Button, Image, View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from "../assets/style"
export default function Upload() {
  const [imageUri, setImageUri] = useState<string | null>(null);

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
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (imageUri) {
      console.log("Submitting image:", imageUri);
      
    } else {
      alert("No image selected!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text>Please upload an image</Text>
        )}
      </View>
      <Button title={imageUri ? 'Change Image' : 'Add Image'} onPress={pickImage} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}
