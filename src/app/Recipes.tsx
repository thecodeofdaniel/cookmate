'use client';

// Next
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

// Tanstack
import { useQuery } from '@tanstack/react-query';

// Components
import Recipe from './Recipe';

// Libraries
import { fetchRecipes } from '@/lib/fetch';
import { createFetchRecipesApiURL } from '@/lib/utils';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Local data
import recipesJSON from '../../public/recipes.json';

//------------------------------------------------------------------------------
type Props = {
  params: string;
  page: number;
  className?: string;
};

const AMOUNT = 8;

export default function Recipes({ params, page, className }: Props) {
  // console.log('Render: Recipes');

  const router = useRouter();
  const searchParams = useSearchParams();

  const url = createFetchRecipesApiURL(params);

  const { data: recipes = [], isLoading = false } = useQuery({
    queryKey: ['recipes', url],
    queryFn: () => fetchRecipes(url),
    staleTime: Infinity,
    enabled: url !== '',
  });

  if (url === '') {
    return <p>Search for some recipes!</p>;
  }

  // Loading local JSON data for testing
  // const isLoading = false;
  // const recipes = recipesJSON['meals'];

  let MAX_PAGES = Math.ceil(recipes.length / AMOUNT);
  let startIdx;
  let endIdx;
  let paginatedRecipes;

  if (recipes) {
    if (page < MAX_PAGES + 1 && page > 0) {
      startIdx = (page - 1) * AMOUNT;
      endIdx = page * AMOUNT - 1;
    }

    if (endIdx !== undefined) {
      paginatedRecipes = recipes?.slice(startIdx, endIdx + 1);
    }
  }

  const handleNavigation = (direction: 'next' | 'prev') => {
    let currPage = +searchParams.get('page')!;

    if (direction === 'prev') {
      if (currPage - 1 <= 0) {
        return;
      }

      router.push(params + `&page=${currPage - 1}`);
    }

    if (direction === 'next') {
      if (currPage + 1 > MAX_PAGES) {
        return;
      }

      router.push(params + `&page=${currPage + 1}`);
    }
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
                params={params}
              />
            );
          })}
        </ul>
      )}
      <div className="mx-4 mt-auto flex justify-between">
        <Button onClick={() => handleNavigation('prev')} disabled={page === 1}>
          Prev
        </Button>
        <Button
          onClick={() => handleNavigation('next')}
          disabled={page === MAX_PAGES}
        >
          Next
        </Button>
      </div>
    </>
  );
}
