'use client';

import { useSearchTextStore } from '@/providers/searchText-store-provider';

export default function searchText() {
  const { searchText } = useSearchTextStore((state) => state);

  return <>{searchText}</>;
}
