// 'use client';
// 'use server';

// Next
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

// Tanstack
import { useQuery } from '@tanstack/react-query';

// Components
import Recipe from './Recipe';
import { Button } from '@/components/ui/button';

// Libraries
import { API_fetchRecipes, fetchRecipes } from '@/lib/fetch';
import {
  cn,
  createFetchRecipesApiURL,
  createFetchRecipesParams,
} from '@/lib/utils';

// Local data
import recipesJSON from '../../public/recipes.json';
import { Suspense } from 'react';

import Navigation from '@/components/Navigation';

//------------------------------------------------------------------------------
type Props = {
  page: number;
  className?: string;
  recipeParams: string;
  searchParams?: string;
};

const AMOUNT = 2;

export default async function Recipes({
  page,
  className,
  recipeParams,
  searchParams,
}: Props) {
  // console.log('Render: Recipes');

  if (recipeParams === '') {
    return <p>Search for some recipes!</p>;
  }

  const url = createFetchRecipesApiURL(recipeParams);
  // const recipes = await fetchRecipes(url);
  const recipes = recipesJSON['meals'];

  if (recipes === null) {
    return <p>No recipes found :(</p>;
  }

  const maxPages = Math.ceil(recipes.length / AMOUNT);
  let startIdx;
  let endIdx;
  let paginatedRecipes;

  if (page < maxPages + 1 && page > 0) {
    startIdx = (page - 1) * AMOUNT;
    endIdx = page * AMOUNT - 1;
  }

  if (endIdx !== undefined) {
    paginatedRecipes = recipes?.slice(startIdx, endIdx + 1);
  }

  return (
    <>
      <ul
        className={cn(
          className,
          'flex flex-wrap items-start justify-center gap-2',
        )}
      >
        {paginatedRecipes?.map((recipe) => {
          // return <Recipe key={recipe.idMeal} fetchedRecipe={recipe} />;
          return <li key={recipe.idMeal}>id: {recipe.idMeal}</li>;
        })}
      </ul>
      <Navigation recipeParams={recipeParams} page={page} maxPages={maxPages} />
    </>
  );

  // let MAX_PAGES: number | null = null;
  // let startIdx;
  // let endIdx;
  // let paginatedRecipes;

  // if (recipes) {
  //   MAX_PAGES = Math.ceil(recipes.length / AMOUNT);

  //   if (page < MAX_PAGES + 1 && page > 0) {
  //     startIdx = (page - 1) * AMOUNT;
  //     endIdx = page * AMOUNT - 1;
  //   }

  //   if (endIdx !== undefined) {
  //     paginatedRecipes = recipes?.slice(startIdx, endIdx + 1);
  //   }
  // }

  // const handleNavigation = (direction: 'prev' | 'next') => {
  //   let currPage = +nextSearchParams.get('page')!;
  //   let newPage;

  //   if (direction === 'prev') {
  //     newPage = currPage - 1;

  //     if (newPage <= 0) {
  //       return;
  //     }
  //   }

  //   if (direction === 'next') {
  //     newPage = currPage + 1;

  //     if (newPage > MAX_PAGES!) {
  //       return;
  //     }
  //   }

  //   router.push(searchParams + `&page=${newPage}`);
  // };

  // return (
  //   <>
  //     {isLoading && <p>Loading recipes...</p>}
  //     {!isLoading && !recipes && <p>No recipes found :(</p>}
  //     {!isLoading && paginatedRecipes && (
  //       <ul
  //         className={cn(
  //           className,
  //           'flex flex-wrap items-start justify-center gap-2',
  //         )}
  //       >
  //         {paginatedRecipes?.map((recipe) => {
  //           return (
  //             <Recipe
  //               key={recipe.idMeal}
  //               fetchedRecipe={recipe}
  //               params={searchParams}
  //             />
  //           );
  //         })}i={page === 1}
  //         >
  //           Prev
  //         </Button>
  //         <Button
  //           onClick={() => handleNavigation('next')}
  //           disabled={page === MAX_PAGES}
  //         >
  //           Next
  //         </Button>
  //       </div>
  //     )}
  //   </>
  // );
}
