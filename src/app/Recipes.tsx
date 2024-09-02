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

//------------------------------------------------------------------------------
type Props = {
  page: number;
  className?: string;
  recipeParams: string;
};

const AMOUNT = 8;

export default async function Recipes({
  page,
  className,
  recipeParams,
}: Props) {
  // console.log('Render: Recipes');

  if (recipeParams === '') {
    return <p>Search for some recipes!</p>;
  }

  console.log('recipeParams:', recipeParams);

  const url = createFetchRecipesApiURL(recipeParams);
  const recipes = await fetchRecipes(url);

  console.log('Recipes', recipes);

  return <h1>Hello World</h1>;

  // return (
  //   <>
  //     <ul
  //       className={cn(
  //         className,
  //         'flex flex-wrap items-start justify-center gap-2',
  //       )}
  //     >
  //       {recipes?.map((recipe) => {
  //         return (
  //           // <Recipe
  //           //   key={recipe.idMeal}
  //           //   fetchedRecipe={recipe}
  //           //   params={searchParams}
  //           // />
  //           <li>{recipe.idMeal}</li>
  //         );
  //       })}
  //     </ul>
  //   </>
  // );

  // // console.log('recipeParams:', recipeParams);
  // const recipes = await API_fetchRecipes(recipeParams);

  // console.log(recipes);

  // if (recipeParams === '') {
  //   return <p>Search for some recipes!</p>;
  // } else {
  //   return <p>Recipes found!</p>;
  // }

  // if (recipes.length === 0) {
  //   return <p>No recipes found :(</p>;
  // }

  // Loading local JSON data for testing
  // const isLoading = false;
  // const recipes = recipesJSON['meals'];

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
  //         })}
  //       </ul>
  //     )}
  //     {!isLoading && MAX_PAGES !== null && recipes.length > AMOUNT && (
  //       <div className="mx-4 mt-auto flex justify-between">
  //         <Button
  //           onClick={() => handleNavigation('prev')}
  //           disabled={page === 1}
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
