import { Card, Layout, Skeleton, Space, Button, Input, Badge, Row, Col } from 'antd';
import React, { useEffect } from 'react';
import Pagination from '../commons/Pagination';
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

  if (noteList && view === 'Y') {
    notes = noteList.map((note) => (
      <Note key={note.id} id={note.id} title={note.title} content={note.content} onRemove={() => onRemove(note.id)} />
    ));
  }

  let skeletonView = [];

  if (view === 'N') {
    for (let i = 0; i < length; i++) {
      skeletonView.push(
        <div key={i}>
          <Skeleton active paragraph={{ rows: 1 }} /> <hr />
        </div>,
      );
    }
  }
  return (
    <>
      <AddNote
        inputTitle={inputTitle}
        inputContent={inputContent}
        suggests={suggests}
        onChangeTitle={onChangeTitle}
        onChangeContent={onChangeContent}
        onSubmit={onSubmit}
      />
      <Row style={{ padding: '0.5rem' }}>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Badge count={view === 'N' ? 'loading...' : length} />
        </Col>
      </Row>
      <Layout style={{ padding: '0.125rem' }}>
        {notes && view === 'Y' && <div>{notes}</div>}
        {skeletonView && skeletonView}
        <Toast length={length} view={view} />
        <Pagination length={length} />
      </Layout>
    </>
  );
};

export default React.memo(NoteLayout);
