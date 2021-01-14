import { Card, Layout, Skeleton, Space, Button, Input } from 'antd';
import React, { useEffect } from 'react';
import AddNote from './AddNote';
import Note from './note';
import Toast from './Toast';

const NoteLayout = ({
  inputTitle,
  inputContent,
  noteList,
  suggests,
  onChangeTitle,
  onChangeContent,
  onSubmit,
  onRemove,
  length,
  skeleton,
  view,
}) => {
  let notes = null;

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log(1);
  //     ));
  //   }, 5000);
  // });
  if (noteList && view === 'Y') {
    notes = noteList.map((note) => (
      <Note key={note.id} id={note.id} title={note.title} content={note.content} onRemove={() => onRemove(note.id)} />
    ));
  }

  let skeletonView = [];

  if (view === 'N') {
    for (let i = 0; i < length; i++) {
      skeletonView.push(
        <div>
          <Skeleton active paragraph={{ rows: 1 }} /> <hr />
        </div>,
      );
    }
  }
  return (
    <Layout>
      <AddNote
        inputTitle={inputTitle}
        inputContent={inputContent}
        suggests={suggests}
        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
        onSubmit={onSubmit}
      />
      {notes && view === 'Y' && <div>{notes}</div>}
      {skeletonView && skeletonView}
      <Toast length={length} view={view} />
    </Layout>
  );
};

export default React.memo(NoteLayout);
