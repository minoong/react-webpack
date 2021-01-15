import React from 'react';
import { Input } from 'antd';

const NoteSearch = ({ onListNote }) => {
  return <Input placeholder="search..." onChange={onListNote} />;
};

export default NoteSearch;
