import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import styles from '../assets/style';
import blur from '../assets/images/blur1.jpg';
interface ArticleBoxProps {
  title: string;
  imageUri?: string | { uri: string };
  onPress: () => void;
}

const ArticleBox: React.FC<ArticleBoxProps> = ({ title, imageUri, onPress }) => {
  return (
    <TouchableOpacity style={styles.articleBox} onPress={onPress}>
      <View style={styles.articleContent}>
      {imageUri ? (
          typeof imageUri === 'string' ? (
            <Image source={{ uri: imageUri }} style={styles.articleImage} />
          ) : (
            <Image source={imageUri} style={styles.articleImage} />
          )
        ) : (
            <View>
          <Image source={blur} style={styles.articleImage} />
          </View>
        )}
        <Text style={styles.articleTitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default ArticleBox;
