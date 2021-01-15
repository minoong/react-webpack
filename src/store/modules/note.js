import { createAction, handleActions } from 'redux-actions';
import { takeLatest, take, takeEvery } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import * as suggestsAPI from '../../lib/api/suggests';

const INPUT_TITILE = 'note/INPUT_TITLE';
const INPUT_CONTENT = 'note/INPUT_CONTENT';
const ADD_NOTE = 'note/INPUT_NOTE';
const REMOVE_NOTE = 'note/REMOVE_NOTE';
const LIST_NOTE = 'note/LIST_NOTE';

const [SUGGESTS, SUGGESTS_SUCCESS, SUGGESTS_FAILURE] = createRequestActionTypes('note/SUGGESTS');

let id = 0;

export const changeInputTitle = createAction(INPUT_TITILE, (title) => title);
export const changeInputContent = createAction(INPUT_CONTENT, (content) => content);
export const addNote = createAction(ADD_NOTE, (title, content) => ({
  title,
  content,
}));
export const removeNote = createAction(REMOVE_NOTE, (id) => id);
export const chageListNote = createAction(LIST_NOTE, (search) => search);

const titleSegguestsSaga = createRequestSaga(INPUT_TITILE, suggestsAPI.getSuggests);

const test = () => {
  console.log('2222222222');
};

export function* segguestSaga() {
  // yield takeLatest(INPUT_TITILE, titleSegguestsSaga);
  yield takeLatest(INPUT_TITILE, test);
  yield takeLatest(INPUT_CONTENT, test);
  yield takeLatest(ADD_NOTE, chageListNote);
}

const initState = {
  inputTitle: '',
  inputContent: '',
  id: 0,
  noteList: [{ id: 0, title: 'title #1', content: 'content #1' }],
  suggests: [],
  listNote: [],
  error: null,
};

const note = handleActions(
  {
    [INPUT_TITILE]: (state, { payload: inputTitle }) => {
      const search = `^${inputTitle}`;
      const regexp = new RegExp(search, 'g');
      const suggests = state.noteList.filter(({ title }) => regexp.test(title));

      return {
        ...state,
        inputTitle,
        suggests: inputTitle === '' ? [] : suggests,
      };
    },
    [LIST_NOTE]: (state, { payload: search }) => {
      console.log('@@@@@@@', search);
      const regexp = new RegExp(search, 'gi');
      const listNote = state.noteList.filter(({ title, content }) => regexp.test(title) || regexp.test(content));

      return {
        ...state,
        listNote: search === '' ? state.noteList : listNote,
      };
    },
    [INPUT_CONTENT]: (state, { payload: inputContent }) => ({
      ...state,
      inputContent,
    }),
    [ADD_NOTE]: (state, { payload: note }) => ({
      ...state,
      id: state.id + 1,
      noteList: [{ ...note, id: state.id + 1 }, ...state.noteList],
    }),
    [REMOVE_NOTE]: (state, { payload: id }) => ({
      ...state,
      noteList: state.noteList.filter((note) => note.id !== id),
    }),
    [SUGGESTS_SUCCESS]: (state, { payload }) => ({
      ...state,
      suggests: payload,
    }),
    [SUGGESTS_FAILURE]: (state, { payload }) => ({
      ...state,
      suggests: [],
      error: payload.error,
    }),
  },
  initState,
);

export default note;
