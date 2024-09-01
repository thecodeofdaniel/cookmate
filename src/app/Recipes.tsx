'use client';

// Next
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

// Tanstack
import { useQuery } from '@tanstack/react-query';

// Components
import Recipe from './Recipe';
import { Button } from '@/components/ui/button';

// Libraries
import { API_fetchRecipes } from '@/lib/fetch';
import { cn } from '@/lib/utils';

// Local data
import recipesJSON from '../../public/recipes.json';

//------------------------------------------------------------------------------
type Props = {
  searchParams: string;
  page: number;
  className?: string;
};

const AMOUNT = 8;

export default function Recipes({ searchParams, page, className }: Props) {
  // console.log('Render: Recipes');

  const router = useRouter();
  const nextSearchParams = useSearchParams();

  const { data: recipes = [], isLoading = false } = useQuery({
    queryKey: ['recipes', searchParams],
    queryFn: () => API_fetchRecipes(searchParams),
    staleTime: Infinity,
    enabled: searchParams !== '',
  });

  if (searchParams === '') {
    return <p>Search for some recipes!</p>;
  }

  // if (recipes.length === 0) {
  //   return <p>No recipes found :(</p>;
  // }

  // Loading local JSON data for testing
  // const isLoading = false;
  // const recipes = recipesJSON['meals'];

  let MAX_PAGES: number | null = null;
  let startIdx;
  let endIdx;
  let paginatedRecipes;

  if (recipes) {
    MAX_PAGES = Math.ceil(recipes.length / AMOUNT);

    if (page < MAX_PAGES + 1 && page > 0) {
      startIdx = (page - 1) * AMOUNT;
      endIdx = page * AMOUNT - 1;
    }

    if (endIdx !== undefined) {
      paginatedRecipes = recipes?.slice(startIdx, endIdx + 1);
    }
  }

  const handleNavigation = (direction: 'prev' | 'next') => {
    let currPage = +nextSearchParams.get('page')!;
    let newPage;

    if (direction === 'prev') {
      newPage = currPage - 1;

      if (newPage <= 0) {
        return;
      }
    }

    if (direction === 'next') {
      newPage = currPage + 1;

      if (newPage > MAX_PAGES!) {
        return;
      }
    }

    router.push(searchParams + `&page=${newPage}`);
  };

  return (
    <>
      {isLoading && <p>Loading recipes...</p>}
      {!isLoading && !recipes && <p>No recipes found :(</p>}
      {!isLoading && paginatedRecipes && (
        <ul
          className={cn(
            className,
            'flex flex-wrap items-start justify-center gap-2',
          )}
        >
          {paginatedRecipes?.map((recipe) => {
            return (
              <Recipe
                key={recipe.idMeal}
                fetchedRecipe={recipe}
                params={searchParams}
              />
            );
          })}
        </ul>
      )}
      {!isLoading && MAX_PAGES !== null && recipes.length > AMOUNT && (
        <div className="mx-4 mt-auto flex justify-between">
          <Button
            onClick={() => handleNavigation('prev')}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Button
            onClick={() => handleNavigation('next')}
            disabled={page === MAX_PAGES}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
}
