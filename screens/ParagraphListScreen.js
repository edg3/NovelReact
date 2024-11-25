import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'novelApp.db', location: 'default' });

const ParagraphListScreen = ({ navigation, route }) => {
  const { novelId } = route.params;
  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    fetchParagraphs();
  }, []);

  const fetchParagraphs = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Paragraph WHERE novel_id = ? ORDER BY `order`',
        [novelId],
        (tx, results) => {
          const rows = results.rows;
          let paragraphs = [];
          for (let i = 0; i < rows.length; i++) {
            paragraphs.push(rows.item(i));
          }
          setParagraphs(paragraphs);
        }
      );
    });
  };

  const reorderParagraphs = (startIndex, endIndex) => {
    const updatedParagraphs = [...paragraphs];
    const [movedParagraph] = updatedParagraphs.splice(startIndex, 1);
    updatedParagraphs.splice(endIndex, 0, movedParagraph);

    setParagraphs(updatedParagraphs);

    db.transaction(tx => {
      updatedParagraphs.forEach((paragraph, index) => {
        tx.executeSql(
          'UPDATE Paragraph SET `order` = ? WHERE id = ?',
          [index, paragraph.id]
        );
      });
    });
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={styles.content}>{item.content}</Text>
      <Button
        title="Move Up"
        onPress={() => reorderParagraphs(index, index - 1)}
        disabled={index === 0}
      />
      <Button
        title="Move Down"
        onPress={() => reorderParagraphs(index, index + 1)}
        disabled={index === paragraphs.length - 1}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={paragraphs}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Button
        title="Add Paragraph"
        onPress={() => navigation.navigate('CreateParagraph', { novelId })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  content: {
    fontSize: 16,
  },
});

export default ParagraphListScreen;
