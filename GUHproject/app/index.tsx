import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../assets/style';
import ArticleBox from '../components/articlebox';

const userArticles = [
  { id: 1, title: 'not defined yet', image: 'https://via.placeholder.com/150'},
];
export default function Index() {
  const navigation = useNavigation();

  const handleArticlePress = (articleId: number) => {
    navigation.navigate('Article', { articleId });
  };

  const handleCreateNewProject = () => {
    navigation.navigate('Upload');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      <Text style={styles.textgen}>Read into the memories of an earlier time...</Text>
      <ScrollView contentContainerStyle={styles.articlesContainer}>
       <ArticleBox
          onPress={handleCreateNewProject}
        />
        {userArticles.map((article) => (
          <ArticleBox
            key={article.id}
            title={article.title}
            imageUri={article.image}
            onPress={() => handleArticlePress(article.id)}
          />
        ))}
        
      </ScrollView>
    </View>
  );
}