// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla';

export type SearchTextState = {
  searchText: string;
};

export type SearchTextActions = {
  setText: (text: string) => void;
};

export type SearchTextStore = SearchTextState & SearchTextActions;

export const initSearchTextStore = (): SearchTextState => {
  return { searchText: new Date().getFullYear().toString() };
};

export const defaultInitState: SearchTextState = {
  searchText: '',
};

export const createSearchTextStore = (
  initState: SearchTextState = defaultInitState,
) => {
  return createStore<SearchTextStore>()((set) => ({
    ...initState,
    setText: (text) =>
      set((state) => ({ searchText: (state.searchText = text) })),
  }));
};
