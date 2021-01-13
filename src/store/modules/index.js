import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { all } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage';
import note from './note';
import loading from '../../modules/loading';
import { segguestSaga } from './note';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['note'],
};

const rootReducer = combineReducers({
  note,
  loading,
});

export function* rootSaga() {
  yield all([segguestSaga()]);
}

export default persistReducer(persistConfig, rootReducer);
