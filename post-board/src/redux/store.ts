import rootReducer from './reducers/rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const persistor = persistStore(store);
export default { store, persistor };
