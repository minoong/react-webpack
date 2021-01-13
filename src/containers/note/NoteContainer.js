import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoteLayout from '../../components/note/NoteLayout';
import { addNote, changeInputContent, changeInputTitle, removeNote } from '../../store/modules/note';

const NoteContainer = () => {
  const { inputTitle, inputContent, noteList } = useSelector(({ note }) => ({
    inputTitle: note.inputTitle,
    inputContent: note.inputContent,
    noteList: note.noteList,
  }));

  const dispatch = useDispatch();

  const handleChangeTitle = useCallback(
    (e) => {
      dispatch(changeInputTitle(e.target.value, noteList));
    },
    [dispatch, noteList],
  );

  const handleChangeContent = useCallback((e) => {
    dispatch(changeInputContent(e.target.value));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(addNote(inputTitle, inputContent));
      dispatch(changeInputTitle(''));
      dispatch(changeInputContent(''));
    },
    [dispatch, inputTitle, inputContent],
  );

  const handleRemove = useCallback(
    (id) => {
      dispatch(removeNote(id));
    },
    [dispatch],
  );

  return (
    <NoteLayout
      inputTitle={inputTitle}
      inputContent={inputContent}
      noteList={noteList}
      onChangeTitle={handleChangeTitle}
      onChangeContent={handleChangeContent}
      onSubmit={handleSubmit}
      onRemove={handleRemove}
      length={noteList.length}
    />
  );
};

export default React.memo(NoteContainer);
