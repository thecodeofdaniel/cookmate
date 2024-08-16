// 'use client';

// import { useSearchTextStore } from '@/providers/searchText-store-provider';
import SearchText from './search-text';

export default function Blog() {
  // const { searchText } = useSearchTextStore((state) => state);

  return (
    <div className="m-4">
      <h1>On blog page</h1>
      <SearchText />
    </div>
  );
}
