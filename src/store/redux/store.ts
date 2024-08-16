import { configureStore } from '@reduxjs/toolkit';

// Slices
import counterSlice from './features/counterSlice';
import searchTextSlice from './features/searchTextSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
      searchText: searchTextSlice.reducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
