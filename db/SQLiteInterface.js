import { SQLite } from 'expo';
import get from 'lodash/get';

class SQLiteNotes {
  constructor() {
    this.db = SQLite.openDatabase('db.MMDemo');
    this.initNotesTable();
  }

  initNotesTable() {
    this.db.transaction((transaction) => {
      transaction.executeSql(
        'create table if not exists notes (id integer primary key not null, title text, content text)',
      );
    });
  }

  getAllNotes = () => new Promise((resolve, reject) => {
    this.db.transaction((transaction) => {
      transaction.executeSql(
        'select * from notes',
        null,
        (tx, results) => {
          resolve(get(results, 'rows', {}));
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });

  addNote = ({ title, description }) => new Promise((resolve, reject) => {
    this.db.transaction((transaction) => {
      transaction.executeSql(
        'insert into notes ( title, content ) values (?, ?)',
        [title, description],
        (tx, results) => {
          const newId = get(results, 'insertId');
          resolve(newId);
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });

  editNote = ({ title, description, id }) => new Promise((resolve, reject) => {
    this.db.transaction((transaction) => {
      transaction.executeSql(
        'update notes set title = ?, content = ? where id = ?',
        [title, description, id],
        () => {
          resolve(true);
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });

  deleteNote = id => new Promise((resolve, reject) => {
    this.db.transaction((transaction) => {
      transaction.executeSql(
        'delete from notes where id = ?',
        [id],
        () => {
          resolve(true);
        },
        (tx, err) => {
          reject(err);
        },
      );
    });
  });
}

export default SQLiteNotes;
