import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../assets/style';

interface ArticleBoxProps {
  title: string;
  imageUri?: string;
  onPress: () => void;
}

const ArticleBox: React.FC<ArticleBoxProps> = ({ title, imageUri, onPress }) => {
  return (
    <TouchableOpacity style={styles.articleBox} onPress={onPress}>
      <View style={styles.articleContent}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.articleImage} />
        ) : (
          <Text style={styles.plusSign}>+</Text>
        )}
        <Text style={styles.articleTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
