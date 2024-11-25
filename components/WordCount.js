import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { countWords } from '../utils/wordCount';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'novelApp.db', location: 'default' });

const WordCount = ({ novelId }) => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const fetchParagraphs = () => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT content FROM Paragraph WHERE novel_id = ? AND is_chapter = 0',
          [novelId],
          (tx, results) => {
            let paragraphs = [];
            for (let i = 0; i < results.rows.length; i++) {
              paragraphs.push(results.rows.item(i).content);
            }
            const totalWordCount = paragraphs.reduce((count, paragraph) => count + countWords(paragraph), 0);
            setWordCount(totalWordCount);
          }
        );
      });
    };

    fetchParagraphs();
  }, [novelId]);

  return (
    <View style={styles.container}>
      <Text style={styles.wordCountText}>Word Count: {wordCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    margin: 10,
  },
  wordCountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WordCount;
