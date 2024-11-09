import React from 'react';
import { Button, View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../assets/style';
import ArticleBox from '../components/articlebox';
import {Link} from 'expo-router';
import Plus from '../assets/style';
const userArticles = [
  { id: 1, title: 'First Article', image: Plus},
  { id: 2, title: 'Second Article', image: 'https://via.placeholder.com/150' },
];

export default function Index() {
  const navigation = useNavigation();

  const handleArticlePress = (articleId: number) => {
    navigation.navigate('Article', { articleId });
  };
  const handleCreateNewProject = () => {
    console.log('Create a new project');
    navigation.navigate('Article');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      <ScrollView contentContainerStyle={styles.articlesContainer}>
        {userArticles.map((article) => (
          <ArticleBox
            key={article.id}
            title={article.title}
            imageUri={article.image}
            onPress={() => handleArticlePress(article.id)}
          />
        ))}
        <ArticleBox
          title="New Project"
          onPress={handleCreateNewProject}
        />
      </ScrollView>
    </View>
  );
}