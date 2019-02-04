import get from 'lodash/get';
import SQLiteInterface from '../db/SQLiteInterface';

const SQLite = new SQLiteInterface();

class Notes {
  static GOT_NOTES = 'GOT_NOTES'

  static NOTE_ADDED = 'NOTE_ADDED'

  static NOTE_EDITED = 'NOTE_EDITED'

  static NOTE_DELETED = 'NOTE_DELETED'

  static NOTE_ERROR = 'NOTE_ERROR'

  static getNotes = () => (dispatch) => {
    SQLite.getAllNotes().then((rows) => {
      const notes = get(rows, '_array', []);
      dispatch({
        type: Notes.GOT_NOTES,
        payload: notes,
      });
    }).catch((err) => {
      dispatch({
        type: Notes.NOTE_ERROR,
        payload: err,
      });
    });
  }

  static addNote = (title, description) => (dispatch) => {
    SQLite.addNote({ title, description }).then((newId) => {
      dispatch({
        type: Notes.NOTE_ADDED,
        payload: { title, description, id: newId },
      });
    }).catch((err) => {
      dispatch({
        type: Notes.NOTE_ERROR,
        payload: err,
      });
    });
  }

  static editNote = (title, description, id) => (dispatch) => {
    SQLite.editNote({ title, description, id }).then(() => {
      dispatch({
        type: Notes.NOTE_EDITED,
        payload: { title, description, id },
      });
    }).catch((err) => {
      dispatch({
        type: Notes.NOTE_ERROR,
        payload: err,
      });
    });
  }

  static deleteNote = id => (dispatch) => {
    SQLite.deleteNote(id).then(() => {
      dispatch({
        type: Notes.NOTE_DELETED,
        payload: id,
      });
    }).catch((err) => {
      dispatch({
        type: Notes.NOTE_ERROR,
        payload: err,
      });
    });
  }
}

export default Notes;
