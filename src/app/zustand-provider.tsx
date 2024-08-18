import { CounterStoreProvider } from '@/providers/counter-store-provider';
import { SearchTextStoreProvider } from '@/providers/searchText-store-provider';

export default function ZustandProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
