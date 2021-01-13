import { call, put } from 'redux-saga/effects';
import { finishLoading, startLoading } from '../modules/loading';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return [type, SUCCESS, FAILURE];
};

function getStatus(type) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return [SUCCESS, FAILURE];
}

export default function createRequestSaga(type, request) {
  const [SUCCESS, FAILURE] = getStatus(type);

  return function* (action) {
    yield put(startLoading(type));

    try {
      console.log(action.payload);
      const response = yield call(request, action.payload);
      console.log('@@', response);
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      console.error(e);
      yield put({
        type: FAILURE,
        payload: e,
        error: e,
      });
    } finally {
      yield put(finishLoading(type));
    }
  };
}
