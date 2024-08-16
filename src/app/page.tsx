'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/redux/hooks';
import {
  selectSearchText,
  setSearchText,
} from '@/store/redux/features/searchTextSlice';
import { useDebounce } from '@/lib/hooks';
import { HomePage } from './home-page';

import { useSearchTextStore } from '@/providers/searchText-store-provider';

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
    });
  };

  // const searchText = useAppSelector(selectSearchText);

  const { searchText, setText } = useSearchTextStore((state) => state);
  const debouncedSearchText = useDebounce(searchText);

  // const dispatch = useAppDispatch();

  return (
    <div className="m-4">
      <Input
        placeholder="Enter some ingredients (e.g. salt, pepper, chicken)"
        value={searchText}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <h2>{debouncedSearchText}</h2>
    </div>
    // <div className="m-4">
    //   <Input
    //     placeholder="Enter some ingredients (e.g. salt, pepper, chicken)"
    //     value={searchText}
    //     onChange={(e) => {
    //       dispatch(setSearchText(e.target.value));
    //     }}
    //   />
    //   <h2>{debouncedSearchText}</h2>
    //   <div className="flex flex-col gap-4">
    //     <Button onClick={() => scrollToSection('hello')}>
    //       Scroll to hello
    //     </Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button className="text-red-500" id="hello">
    //       Here
    //     </Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //     <Button>Hello</Button>
    //   </div>
    // </div>
    // <HomePage />
  );
}
