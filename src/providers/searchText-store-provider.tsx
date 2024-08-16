'use client';

import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import {
  createSearchTextStore,
  SearchTextStore,
} from '@/store/zustand/searchText-store';

export type SearchTextStoreApi = ReturnType<typeof createSearchTextStore>;

export const SearchTextStoreContext = createContext<
  SearchTextStoreApi | undefined
>(undefined);

export interface SearchTextStoreProviderProps {
  children: React.ReactNode;
}

export const SearchTextStoreProvider = ({
  children,
}: SearchTextStoreProviderProps) => {
  const storeRef = useRef<SearchTextStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSearchTextStore();
  }

  return (
    <SearchTextStoreContext.Provider value={storeRef.current}>
      {children}
    </SearchTextStoreContext.Provider>
  );
};

export const useSearchTextStore = <T,>(
  selector: (store: SearchTextStore) => T,
): T => {
  const searchTextStoreContext = useContext(SearchTextStoreContext);

  if (!searchTextStoreContext) {
    throw new Error(
      `useSearchTextStore must be used within SearchTextStoreProvider`,
    );
  }

  return useStore(searchTextStoreContext, selector);
};
