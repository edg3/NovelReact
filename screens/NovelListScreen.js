import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'novelApp.db', location: 'default' });

const NovelListScreen = ({ navigation }) => {
  const [novels, setNovels] = useState([]);

  useEffect(() => {
    fetchNovels();
  }, []);

  const fetchNovels = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Novel', [], (tx, results) => {
        const rows = results.rows;
        let novels = [];
        for (let i = 0; i < rows.length; i++) {
          novels.push(rows.item(i));
        }
        setNovels(novels);
      });
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('CreateNovel', { novelId: item.id })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={novels}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <Button
        title="Add Novel"
        onPress={() => navigation.navigate('CreateNovel')}
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default NovelListScreen;
