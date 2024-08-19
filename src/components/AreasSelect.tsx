'use client';

import { useQuery } from '@tanstack/react-query';

import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { fetchAreas } from '@/lib/fetch';

export default function AreasSelect() {
  // console.log('Render: AreasSelect');

  const { data: areas, isLoading } = useQuery({
    queryKey: ['area'],
    queryFn: () => fetchAreas(),
    staleTime: Infinity,
  });

  return (
    <>
      <SelectTrigger>
        <SelectValue placeholder="Select Area (All)" />
      </SelectTrigger>
      <SelectContent>
        {isLoading && <p>Please wait...</p>}
        {!isLoading &&
          areas?.map((area) => {
            return (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            );
          })}
      </SelectContent>
    </>
  );
}
