// 'use client';

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

import { fetchCategories } from '@/lib/fetch';

export default async function SearchForm() {
  console.log('Render searchForm');

  const categories = await fetchCategories();

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-2">
          <Input placeholder="Enter some ingredients (e.g. salt, pepper, chicken)" />
        </div>
        <div className="flex-1">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Category (Any)" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => {
                return (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
