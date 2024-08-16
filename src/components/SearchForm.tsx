'use client';

import { useSearchTextStore } from '@/providers/searchText-store-provider';

import { Input } from './ui/input';

import { useDebounce } from '@/lib/hooks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SearchForm() {
  console.log('Render searchForm');

  // const { searchText, setText } = useSearchTextStore((state) => state);

  // const debouncedSearchText = useDebounce(searchText);

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          className="flex-2"
          placeholder="Enter some ingredients (e.g. salt, pepper, chicken)"
        />
        <Select>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
