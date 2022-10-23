import * as SQLite from "expo-sqlite";

const DATABASE_NAME = "bloco-notas.sqlite";

const SQL_CREATE_ENTRIES = [
  `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY autoincrement,
      email VARCHAR(255) NOT NULL,
      passwd VARCHAR(255) NOT NULL
    )`,
  `CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY autoincrement,
      idUser INTEGER,
      title VARCHAR(255) NOT NULL,
      description text,
      FOREIGN KEY(idUser) REFERENCES users(id)
    )`,
  `INSERT INTO users(email, passwd) VALUES('root@root.com', '12345678')`
];

let _db = null;

export function executeSql(query, params = []) {
  if (!_db) {
    openDB();
  }

  return new Promise((resolve, reject) => {
    _db.transaction(tx => {
      tx.executeSql(
        query,
        params,
        (_, rs) => resolve(rs),
        (_, err) => reject(err)
      );
    });
  });
}

export default function openDB() {
  if (!_db) {
    _db = SQLite.openDatabase(DATABASE_NAME);
    _db.transaction(
      tx => {
        SQL_CREATE_ENTRIES.map(query => {
          tx.executeSql(query);
        });
      },
      err => console.warn(err),
      () => console.log(`Banco iniciado`)
    );

  }

  return _db;
}
