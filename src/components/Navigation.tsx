'use client';

import { useRouter } from 'next/navigation';

import { Button } from './ui/button';

type Props = {
  recipeParams: string;
  page: number;
  maxPages: number;
};

export default function Navigation({ recipeParams, page, maxPages }: Props) {
  const router = useRouter();

  const handleNavigation = (direction: 'prev' | 'next') => {
    let currPage = page;
    let newPage;

    if (direction === 'prev') {
      newPage = currPage - 1;
      if (newPage <= 0) {
        return;
      }
    }
    if (direction === 'next') {
      newPage = currPage + 1;
      if (newPage > maxPages) {
        return;
      }
    }

    router.push(recipeParams + `&page=${newPage}`);
  };

  return (
    <div className="mx-4 flex justify-between">
      <Button className="border" onClick={() => handleNavigation('prev')}>
        Previous
      </Button>
      <Button className="border" onClick={() => handleNavigation('next')}>
        Next
      </Button>
    </div>
  );
}
