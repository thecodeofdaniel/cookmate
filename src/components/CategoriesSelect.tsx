'use client';

import { useQuery } from '@tanstack/react-query';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { fetchCategories } from '@/lib/fetch';
// import { type UseFormRegister } from 'react-hook-form';

// type CategoriesSelectProps = {
//   register: UseFormRegister<FormData>;
// };

export default function CategoriesSelect() {
  console.log('Render: CategoriesSelect');

  const { data: categories, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: () => fetchCategories(),
    staleTime: Infinity,
  });

  return (
    <>
      <Select>
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
      </Select>
    </>
  );
}
