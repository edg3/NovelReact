import React from 'react';
import { View, StyleSheet } from 'react-native';
import WordCount from '../components/WordCount';

const WordCountScreen = ({ route }) => {
  const { novelId } = route.params;

  return (
    <View style={styles.container}>
      <WordCount novelId={novelId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default WordCountScreen;
