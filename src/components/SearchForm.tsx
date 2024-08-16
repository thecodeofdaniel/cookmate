'use client';

import { useSearchTextStore } from '@/providers/searchText-store-provider';

import { Input } from './ui/input';

import { useDebounce } from '@/lib/hooks';

export default function SearchForm() {
  const { searchText, setText } = useSearchTextStore((state) => state);
  const debouncedSearchText = useDebounce(searchText);

  return (
    <>
      <Input
        placeholder="Enter some ingredients (e.g. salt, pepper, chicken)"
        value={searchText}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <h2>{debouncedSearchText}</h2>
    </>
  );
}
