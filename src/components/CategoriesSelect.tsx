'use client';

import { useQuery } from '@tanstack/react-query';

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { fetchCategories } from '@/lib/fetch';

export default function CategoriesSelect() {
  console.log('Render: CategoriesSelect');

  const { data: categories, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: () => fetchCategories(),
    staleTime: Infinity,
  });

  return (
    <>
      <SelectTrigger>
        <SelectValue placeholder="Select Category (All)" />
      </SelectTrigger>
      <SelectContent>
        {isLoading && <p>Please wait...</p>}
        {!isLoading &&
          categories?.map((category) => {
            return (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            );
          })}
      </SelectContent>
    </>
  );
}
