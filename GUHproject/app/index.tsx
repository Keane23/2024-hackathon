import React from 'react';
import { Button, View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../assets/style';
import {Link} from 'expo-router'

export default function Index() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      <Link href="/article">Go to article</Link>
      <Link href="/upload">Go to upload</Link>
    </View>
  );
}