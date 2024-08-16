'use client';

import { useCounterStore } from '@/providers/counter-store-provider';
import { useSearchTextStore } from '@/providers/searchText-store-provider';

export default function searchText() {
  const { searchText } = useSearchTextStore((state) => state);
  const { count } = useCounterStore((state) => state);

  return (
    <>
      <p>{searchText}</p>
      <p>{count}</p>
    </>
  );
}
