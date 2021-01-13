import { createAction, handleActions } from 'redux-actions';

const INPUT_TITILE = 'note/INPUT_TITLE';
const INPUT_CONTENT = 'note/INPUT_CONTENT';
const ADD_NOTE = 'note/INPUT_NOTE';
const REMOVE_NOTE = 'note/REMOVE_NOTE';

let id = 0;

export const changeInputTitle = createAction(INPUT_TITILE, (title) => title);
export const changeInputContent = createAction(
  INPUT_CONTENT,
  (content) => content,
);
export const addNote = createAction(ADD_NOTE, (title, content) => ({
  // id: ++id,
  title,
  content,
}));
export const removeNote = createAction(REMOVE_NOTE, (id) => id);

const initState = {
  inputTitle: '',
  inputContent: '',
  id: 0,
  noteList: [{ id: 0, title: 'title #1', content: 'content #1' }],
};

const note = handleActions(
  {
    [INPUT_TITILE]: (state, { payload: inputTitle }) => ({
      ...state,
      inputTitle,
    }),
    [INPUT_CONTENT]: (state, { payload: inputContent }) => ({
      ...state,
      inputContent,
    }),
    [ADD_NOTE]: (state, { payload: note }) => ({
      ...state,
      id: state.id + 1,
      noteList: [...state.noteList, { ...note, id: state.id + 1 }],
    }),
    [REMOVE_NOTE]: (state, { payload: id }) => ({
      ...state,
      noteList: state.noteList.filter((note) => note.id !== id),
    }),
  },
  initState,
);

export default note;
