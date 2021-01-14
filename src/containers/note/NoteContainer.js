import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NoteLayout from '../../components/note/NoteLayout';
import { addNote, changeInputContent, changeInputTitle, removeNote } from '../../store/modules/note';

const NoteContainer = () => {
  const { inputTitle, inputContent, noteList, suggests } = useSelector(({ note }) => ({
    inputTitle: note.inputTitle,
    inputContent: note.inputContent,
    noteList: note.noteList,
    suggests: note.suggests,
  }));

  // skeleton test
  const [skeleton, setSkeleton] = useState(null);
  const [view, setView] = useState('N');

  useEffect(() => {
    if (!skeleton) {
      setSkeleton(
        setTimeout(() => {
          setThrottle(null);
          setView('Y');
        }, 5000),
      );
    }
  }, [view, setView, skeleton, setThrottle]);

  console.log(view);

  // throttle
  const [throttle, setThrottle] = useState(null);

  const dispatch = useDispatch();

  const handleChangeTitle = useCallback(
    (value) => {
      if (!throttle) {
        setThrottle(
          setTimeout(() => {
            console.log(throttle);
            setThrottle(null);
            dispatch(changeInputTitle(value));
          }, 0),
        );
      }
    },
    [dispatch, throttle, setThrottle],
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
      skeleton={skeleton}
      view={view}
      suggests={suggests}
      onChangeTitle={handleChangeTitle}
      onChangeContent={handleChangeContent}
      onSubmit={handleSubmit}
      onRemove={handleRemove}
      length={noteList.length}
    />
  );
};

export default React.memo(NoteContainer);
