import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'novelApp.db', location: 'default' });

const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Novel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Paragraph (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        novel_id INTEGER,
        content TEXT,
        is_chapter INTEGER,
        order INTEGER,
        FOREIGN KEY (novel_id) REFERENCES Novel(id)
      );`
    );

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Chapter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        novel_id INTEGER,
        title TEXT,
        order INTEGER,
        FOREIGN KEY (novel_id) REFERENCES Novel(id)
      );`
    );
  });
};

export const initializeDatabase = () => {
  createTables();
};
