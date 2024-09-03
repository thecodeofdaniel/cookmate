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
      <Button
        className="border"
        onClick={() => handleNavigation('prev')}
        disabled={page === 1}
      >
        Previous
      </Button>
      {/* <ul className="flex gap-2">
        {[...Array(maxPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li key={index}>
              <Button
                className="pointer-events-none w-10"
                disabled={pageNumber === page}
              >
                {pageNumber}
              </Button>
            </li>
          );
        })}
      </ul> */}
      <Button
        className="border"
        onClick={() => handleNavigation('next')}
        disabled={page === maxPages}
      >
        Next
      </Button>
    </div>
  );
}
