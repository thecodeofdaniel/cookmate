import { CounterStoreProvider } from '@/providers/counter-store-provider';
import { SearchTextStoreProvider } from '@/providers/searchText-store-provider';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CounterStoreProvider>
        <SearchTextStoreProvider>
          <>{children}</>
        </SearchTextStoreProvider>
      </CounterStoreProvider>
    </>
  );
}
