import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './api.js';
import selectionReducer from './selection.slice.js';
import uiReducer from './ui.slice.js';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    selection: selectionReducer,
    ui: uiReducer,
  },
  middleware: (gdm) => gdm().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
