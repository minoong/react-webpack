import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import note from './note';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['note'],
};

const rootReducer = combineReducers({
  note,
});

export default persistReducer(persistConfig, rootReducer);
