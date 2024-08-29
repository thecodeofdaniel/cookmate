'use client';

import { useState } from 'react';

// Tanstack
import { useQuery } from '@tanstack/react-query';

// Components
import Recipe from './Recipe';

// Libraries
import { fetchRecipes } from '@/lib/fetch';
import { createFetchRecipesURL } from '@/lib/utils';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import recipesJSON from '../../public/recipes.json';

//------------------------------------------------------------------------------
type Props = {
  params: string;
  className?: string;
};

export default function Recipes({ params, className }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const url = createFetchRecipesURL(params);

  const AMOUNT = 5;

  // const { data: recipes, isLoading } = useQuery({
  //   queryKey: ['recipes', url],
  //   queryFn: () => fetchRecipes(url),
  //   staleTime: Infinity,
  //   enabled: url !== '',
  // });

  const isLoading = false;
  const recipes = recipesJSON['meals'];
  const MAX_PAGES = Math.ceil(recipes.length / AMOUNT);

  let startIdx;
  let endIdx;

  if (currentPage < MAX_PAGES + 1 && currentPage > 0) {
    startIdx = (currentPage - 1) * AMOUNT;
    endIdx = currentPage * AMOUNT - 1;
  }

  if (url === '') {
    return <p>Search for some recipes!</p>;
  }

  let paginatedRecipes;

  if (recipes) {
    if (endIdx !== undefined) {
      paginatedRecipes = recipes?.slice(startIdx, endIdx + 1);
    }
  }

  const handlePrev = () => {
    setCurrentPage((prev) => {
      if (prev - 1 <= 0) {
        return prev;
      }

      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentPage((prev) => {
      if (prev + 1 > MAX_PAGES) {
        return prev;
      }
      return prev + 1;
    });
  };

  console.log(MAX_PAGES);
  console.log(`${startIdx} - ${endIdx}`);

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
      <div className="mx-4 mt-auto flex justify-between border">
        <Button onClick={handlePrev} disabled={currentPage === 1}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={currentPage === MAX_PAGES}>
          Next
        </Button>
      </div>
    </>
  );
}
