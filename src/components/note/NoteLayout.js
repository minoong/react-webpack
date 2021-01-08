import { Layout } from 'antd';
import React from 'react';
import AddNote from './AddNote';
import Note from './note';

const NoteLayout = ({
  inputTitle,
  inputContent,
  noteList,
  onChangeTitle,
  onChangeContent,
  onSubmit,
  onRemove,
}) => {
  const notes = noteList.map((note) => (
    <Note
      key={note.id}
      id={note.id}
      title={note.title}
      content={note.content}
      onRemove={() => onRemove(note.id)}
    />
  ));
  return (
    <Layout>
      <AddNote
        inputTitle={inputTitle}
        inputContent={inputContent}
        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
        onSubmit={onSubmit}
      />
      <div>{notes}</div>
    </Layout>
  );
};

export default NoteLayout;
