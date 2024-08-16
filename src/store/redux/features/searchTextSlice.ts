import { createSlice } from '@reduxjs/toolkit';
import { useDebounce } from '@/lib/hooks';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface searchTextState {
  value: string;
}

// Define the initial state using that type
const initialState = {
  value: '',
} satisfies searchTextState as searchTextState;

export const searchTextSlice = createSlice({
  name: 'searchText',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    set: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = searchTextSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearchText = (state: RootState) => state.searchText.value;

export const selectDebouncedSearchText = (state: RootState) => {
  return useDebounce(state);
};

export default searchTextSlice;
