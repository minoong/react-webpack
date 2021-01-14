import { createAction, handleActions } from 'redux-actions';
import { takeLatest, take, takeEvery } from 'redux-saga/effects';
import createRequestSaga, { createRequestActionTypes } from '../../lib/createRequestSaga';
import * as suggestsAPI from '../../lib/api/suggests';

const INPUT_TITILE = 'note/INPUT_TITLE';
const INPUT_CONTENT = 'note/INPUT_CONTENT';
const ADD_NOTE = 'note/INPUT_NOTE';
const REMOVE_NOTE = 'note/REMOVE_NOTE';

const [SUGGESTS, SUGGESTS_SUCCESS, SUGGESTS_FAILURE] = createRequestActionTypes('note/SUGGESTS');

let id = 0;

export const changeInputTitle = createAction(INPUT_TITILE, (title) => title);
export const changeInputContent = createAction(INPUT_CONTENT, (content) => content);
export const addNote = createAction(ADD_NOTE, (title, content) => ({
  title,
  content,
}));
export const removeNote = createAction(REMOVE_NOTE, (id) => id);

const titleSegguestsSaga = createRequestSaga(INPUT_TITILE, suggestsAPI.getSuggests);

const test = () => {
  console.log('2222222222');
};

export function* segguestSaga() {
  // yield takeLatest(INPUT_TITILE, titleSegguestsSaga);
  yield takeLatest(INPUT_TITILE, test);
  yield takeLatest(INPUT_CONTENT, test);
}

const initState = {
  inputTitle: '',
  inputContent: '',
  id: 0,
  noteList: [{ id: 0, title: 'title #1', content: 'content #1' }],
  suggests: [],
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
