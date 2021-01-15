/* eslint-disable react/prop-types */
import { Card, Layout, Skeleton, Space, Button, Input, Badge, Row, Col, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const { Meta } = Card;

import React, { useEffect } from 'react';
import Pagination from '../commons/Pagination';
import AddNote from './AddNote';
import Note from './note';
import Toast from './Toast';
import NoteSearch from './NoteSearch';

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
  listNote,
  onListNote,
  view,
}) => {
  let notes = null;

  if (listNote && view === 'Y') {
    console.log(listNote.length);
    notes = listNote.map((note) => (
      <Note key={note.id} id={note.id} title={note.title} content={note.content} onRemove={() => onRemove(note.id)} />
    ));
  }

  let skeletonView = [];

  if (view === 'N') {
    for (let i = 0; i < length; i++) {
      skeletonView.push(
        <Card style={{ width: '100%', marginTop: 16 }} key={i}>
          <Skeleton loading avatar active>
            <Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </Card>,
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
      <Row style={{ padding: '0.5rem' }} justify="center" align="middle">
        <Col span={22} style={{}}>
          <NoteSearch onListNote={onListNote} />
        </Col>
        <Col span={2} style={{ textAlign: 'right' }}>
          <Badge count={view === 'N' ? '1' : length} />
        </Col>
      </Row>
      <Layout style={{ padding: '0.125rem', maxHeight: '450px', overflow: 'auto' }}>
        {notes && view === 'Y' && <div>{notes}</div>}
        {skeletonView && skeletonView}
        <Toast length={length} view={view} />
      </Layout>
      <Layout style={{ padding: '0.125rem' }}>
        <Pagination length={length} />
      </Layout>
    </>
  );
};

NoteLayout.prototype = { inputTitle: PropTypes.string };

export default React.memo(NoteLayout);
