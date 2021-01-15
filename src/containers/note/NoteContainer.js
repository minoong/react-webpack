import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import NoteLayout from '../../components/note/NoteLayout';
import { addNote, changeInputContent, changeInputTitle, removeNote, chageListNote } from '../../store/modules/note';

const NoteContainer = () => {
  const { inputTitle, inputContent, noteList, suggests, listNote } = useSelector(({ note }) => ({
    inputTitle: note.inputTitle,
    inputContent: note.inputContent,
    noteList: note.noteList,
    suggests: note.suggests,
    listNote: note.listNote,
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
        }, 2600),
      );
    }
  }, [view, setView, skeleton, setThrottle]);

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
      message.loading(`등록 중...`, 0.5).then(() => message.success(`등록 완료.`, 0.5));
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

  const searchValue = useRef();

  const handleListNote = useCallback(
    (e) => {
      message.loading('조회 중...', 0.1);
      dispatch(chageListNote(e.target.value));
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
      onListNote={handleListNote}
      onRemove={handleRemove}
      length={listNote.length}
      listNote={listNote}
    />
  );
};

export default React.memo(NoteContainer);
