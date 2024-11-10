import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';
import styles from '../assets/style';
import ArticleBox from '../components/articlebox';
import { RootStackParamList } from './rootstackparam';

import {NativeStackNavigationProp} from '@react-navigation/native-stack'
type IndexScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'index'>;
const userArticles = [
  { id: 1, title: 'not defined yet', image: 'https://via.placeholder.com/150'},
];


  
export default function Index() {
  const navigation = useNavigation<IndexScreenNavigationProp>();
  console.log(navigation)
  const handleArticlePress = (articleId: number) => {
    navigation.navigate('article', { articleId });
  };
  
  const handleCreateNewProject = () => {
    console.log('Create New Project button pressed');
    navigation.navigate('upload');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      <Text style={styles.textgen}>Read into the memories of an earlier time...</Text>
      <ScrollView contentContainerStyle={styles.articlesContainer}>
       <ArticleBox
          title="New"
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