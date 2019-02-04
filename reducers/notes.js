/* eslint no-param-reassign: 0 */

import reduce from 'lodash/reduce';
import Notes from '../actions/Notes';

const defaultState = {
  items: {},
  status: 'closed',
  error: null,
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case Notes.GOT_NOTES: {
      const notesList = action.payload; // this is guaranteed to be an array
      const items = reduce(notesList, (accum, note) => {
        accum[note.id] = {
          title: note.title,
          content: note.content,
          id: note.id,
        };
        return accum;
      }, {});

      return {
        ...state,
        items,
      };
    }
    case Notes.NOTE_ADDED: {
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.id]: {
            title: action.payload.title,
            content: action.payload.description,
            id: action.payload.id,
          },
        },
      };
    }
    case Notes.NOTE_EDITED: {
      const newItems = { ...state.items };
      newItems[action.payload.id] = {
        id: action.payload.id,
        content: action.payload.description,
        title: action.payload.title,
      };
      return {
        ...state,
        items: { ...newItems },
      };
    }
    case Notes.NOTE_DELETED: {
      const newItems = { ...state.items };
      delete newItems[action.payload];

      return {
        ...state,
        items: { ...newItems },
      };
    }
    case Notes.NOTE_ERROR: {
      console.log('error: ', action.payload.message);
      return {
        ...state,
        error: action.payload.message,
      };
    }
    default: {
      return { ...state };
    }
  }
};
