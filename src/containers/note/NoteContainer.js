import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoteLayout from '../../components/note/NoteLayout';
import {
  addNote,
  changeInputContent,
  changeInputTitle,
  removeNote,
} from '../../store/modules/note';

const NoteContainer = () => {
  const { inputTitle, inputContent, noteList } = useSelector(({ note }) => ({
    inputTitle: note.inputTitle,
    inputContent: note.inputContent,
    noteList: note.noteList,
  }));

  console.log(inputTitle, inputContent, noteList);

  const dispatch = useDispatch();

  const handleChangeTitle = (e) => {
    dispatch(changeInputTitle(e.target.value));
  };

  const handleChangeContent = (e) => {
    dispatch(changeInputContent(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputTitle, inputContent);
    dispatch(addNote(inputTitle, inputContent));
    dispatch(changeInputTitle(''));
    dispatch(changeInputContent(''));
  };

  const handleRemove = (id) => {
    dispatch(removeNote(id));
  };

  return (
    <NoteLayout
      inputTitle={inputTitle}
      inputContent={inputContent}
      noteList={noteList}
      onChangeTitle={handleChangeTitle}
      onChangeContent={handleChangeContent}
      onSubmit={handleSubmit}
      onRemove={handleRemove}
    />
  );
};

export default NoteContainer;
