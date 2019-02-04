import React from 'react';
import { connect } from 'react-redux';
import Notes from '../actions/Notes';

const withNotes = (ComposedComponent) => {
  const WithNotes = props => (
    <ComposedComponent {...props} />
  );

  const mapStateToProps = ({ notes }) => ({
    notes,
  });

  const mapDispatchToProps = {
    getNotes: Notes.getNotes,
    addNote: Notes.addNote,
    editNote: Notes.editNote,
    deleteNote: Notes.deleteNote,
  };

  return connect(mapStateToProps, mapDispatchToProps)(WithNotes);
};

export default withNotes;
