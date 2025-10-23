import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {thunk} from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
     'auth',
     'project'
   ],
  blacklist: [],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// export default () => {
//   let store = createStore(
//     persistedReducer,
//     composeEnhancers(applyMiddleware(thunk, logger)),
//   );
//   let persistor = persistStore(store);
//   return { store, persistor };
// };


const configureStore = () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk, logger)),
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

export const { store, persistor } = configureStore();

export default configureStore;