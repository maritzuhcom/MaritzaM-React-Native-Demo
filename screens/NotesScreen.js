/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';

import map from 'lodash/map';
import isNull from 'lodash/isNull';

import {
  Header, Card, Text, Input, Button, ListItem,
} from 'react-native-elements';
import { Dimensions, ScrollView, Keyboard } from 'react-native';
import styled from 'styled-components';

import withNotes from '../hoc/withNotes';

const { height, width } = Dimensions.get('window');
const newNote = {
  0: {
    headerTitle: 'New Note',
    description: '',
    id: 0,
  },
};

class NotesScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    getNotes: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    notes: PropTypes.object.isRequired,
  }

  state = {
    currentNoteTitle: '',
    currentNoteDescription: '',
    currentNoteId: null,
  }

  componentDidMount() {
    const { getNotes } = this.props;
    getNotes();
  }

  saveNote = () => {
    const {
      currentNoteTitle,
      currentNoteDescription,
      currentNoteId,
    } = this.state;
    const { addNote, editNote } = this.props;

    if (isNull(currentNoteId)) {
      addNote(currentNoteTitle, currentNoteDescription);
      this.setState({
        currentNoteTitle: '',
        currentNoteDescription: '',
        currentNoteId: null,
      });
      Keyboard.dismiss();
      return;
    }

    editNote(currentNoteTitle, currentNoteDescription, currentNoteId);
    Keyboard.dismiss();
  }

  deleteComment = () => {
    const { deleteNote } = this.props;
    const { currentNoteId } = this.state;
    deleteNote(currentNoteId);
    Keyboard.dismiss();
    this.setState({
      currentNoteTitle: '',
      currentNoteDescription: '',
      currentNoteId: null,
    });
  }

  renderExistingNotes = () => {
    const { currentNoteId } = this.state;
    const { notes } = this.props;
    const { items } = notes;
    return map(
      {
        ...newNote, ...items,
      },
      ({
        title, content, id, headerTitle,
      }) => (
        <ListItem
          key={id}
          title={title || headerTitle}
          rightIcon={currentNoteId === id ? { name: 'grade' } : null}
          subtitle={content}
          onPress={() => {
            this.setState({
              currentNoteTitle: title || '',
              currentNoteDescription: content,
              currentNoteId: id || null,
            });
          }}
        />
      ),
    );
  }

  render() {
    const { currentNoteTitle, currentNoteDescription, currentNoteId } = this.state;
    return (
      <Main>
        <Header
          leftComponent={{ text: 'SQLite Demo', style: { color: '#fff' } }}
          rightComponent={{ icon: 'create', color: '#fff' }}
        />

        <Card>
          <Text>
            This is a SQLite demo, all your notes will persist unless you delete them!
            Local DBs are one of the best things about embedded and mobile development and are
            a good way to cache data and speed up applications.
          </Text>
        </Card>

        <Card>
          <Input
            label="Note Title"
            value={currentNoteTitle}
            onChangeText={(text) => {
              this.setState({
                currentNoteTitle: text,
              });
            }}
          />
        </Card>

        <Card>
          <Input
            label="Note Description"
            value={currentNoteDescription}
            onChangeText={(text) => {
              this.setState({
                currentNoteDescription: text,
              });
            }}
          />
        </Card>

        <MarginWrapper>
          <Button
            onPress={this.saveNote}
            title="Save"
          />
        </MarginWrapper>

        <MarginWrapper>
          <Button
            onPress={this.deleteComment}
            disabled={isNull(currentNoteId)}
            title="Delete"
          />
        </MarginWrapper>

        <ScrollView>
          {this.renderExistingNotes()}
        </ScrollView>
      </Main>
    );
  }
}

export default withNotes(NotesScreen);

const Main = styled.View`
  height: ${height};
  width: ${width};
`;

const MarginWrapper = styled.View`
  margin-left: 15;
  margin-right: 15;
  margin-top: 15;
`;
