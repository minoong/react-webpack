import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import rootReducer from './store/modules';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
