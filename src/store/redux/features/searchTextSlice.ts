import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface searchTextState {
  value: string;
}

// Define the initial state using that type
const initialState: searchTextState = {
  value: '',
};

// `createSlice` will infer the state type from the `initialState` argument
export const searchTextSlice = createSlice({
  name: 'searchText',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSearchText: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchText } = searchTextSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearchText = (state: RootState) => state.searchText.value;

export default searchTextSlice;
