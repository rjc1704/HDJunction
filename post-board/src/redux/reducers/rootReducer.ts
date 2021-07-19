import { combineReducers } from 'redux';
import boardReducer from './boardReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  boardReducer,
});

export default persistReducer(persistConfig, rootReducer);
