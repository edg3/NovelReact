import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import { Document, Packer, Paragraph, TextRun } from 'docx';

const db = SQLite.openDatabase({ name: 'novelApp.db', location: 'default' });

const ExportNovelScreen = ({ route }) => {
  const { novelId } = route.params;

  const exportNovel = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Novel WHERE id = ?',
        [novelId],
        (tx, novelResults) => {
          if (novelResults.rows.length > 0) {
            const novel = novelResults.rows.item(0);

            tx.executeSql(
              'SELECT * FROM Paragraph WHERE novel_id = ? ORDER BY `order`',
              [novelId],
              (tx, paragraphResults) => {
                const paragraphs = [];
                for (let i = 0; i < paragraphResults.rows.length; i++) {
                  paragraphs.push(paragraphResults.rows.item(i));
                }

                const doc = new Document();
                doc.addSection({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: novel.title,
                          bold: true,
                          size: 32,
                        }),
                      ],
                    }),
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: novel.description,
                          size: 24,
                        }),
                      ],
                    }),
                    ...paragraphs.map(paragraph => new Paragraph({
                      children: [
                        new TextRun({
                          text: paragraph.content,
                          bold: paragraph.is_chapter === 1,
                          size: paragraph.is_chapter === 1 ? 28 : 24,
                        }),
                      ],
                    })),
                  ],
                });

                Packer.toBlob(doc).then(blob => {
                  const path = `${RNFS.DocumentDirectoryPath}/${novel.title}.docx`;
                  RNFS.writeFile(path, blob, 'base64')
                    .then(() => {
                      alert('Novel exported successfully');
                    })
                    .catch(error => {
                      console.error(error);
                      alert('Failed to export novel');
                    });
                });
              }
            );
          }
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Export Novel" onPress={exportNovel} />
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

export default ExportNovelScreen;
