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

import { fetchCategories, fetchAreas } from '@/lib/fetch';

export default async function SearchForm() {
  console.log('Render searchForm');

  const categories = await fetchCategories();
  const areas = await fetchAreas();

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-2">
          <Input placeholder="Enter some ingredients (e.g. salt, pepper, chicken)" />
        </div>
        <div className="flex-1">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Category (All)" />
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
              <SelectValue placeholder="Select Area (All)" />
            </SelectTrigger>
            <SelectContent>
              {areas.map((area) => {
                return (
                  <SelectItem key={area} value={area.toLowerCase()}>
                    {area}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
