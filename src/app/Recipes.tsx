'use client';

// Tanstack
import { useQuery } from '@tanstack/react-query';

// Components
import Recipe from './Recipe';
import Navigation from '@/components/Navigation';

// Libraries
import { fetchRecipesProxy } from '@/lib/fetch';
import { cn } from '@/lib/utils';

// Local data
import recipesJSON from '../../public/recipes.json';

//------------------------------------------------------------------------------
type Props = {
  page: number;
  className?: string;
  recipeParams: string;
};

const AMOUNT = 8;

export default function Recipes({ recipeParams, page, className }: Props) {
  console.log('Render: Recipes');

  const { data: recipes = null, isLoading = false } = useQuery({
    queryKey: ['recipes', recipeParams],
    queryFn: () => fetchRecipesProxy(recipeParams),
    staleTime: Infinity,
    enabled: recipeParams !== '',
  });

  // Loading local JSON data for testing
  // const isLoading = false;
  // const recipes = recipesJSON['meals'];

  // If no recipe params are entered (blank homepage)
  if (recipeParams === '') {
    return <p>Search for some recipes!</p>;
  }

  if (isLoading) {
    return <p>Loading recipes...</p>;
  }

  if (!recipes && !isLoading) {
    return <p>No recipes found :(</p>;
  }

  if (recipes && !isLoading) {
    let MAX_PAGES = Math.ceil(recipes.length / AMOUNT);

    if (page <= 0 || page > MAX_PAGES) {
      return <p>What are you doing here 0_0</p>;
    }

    let startIdx = (page - 1) * AMOUNT;
    let endIdx = page * AMOUNT - 1;
    let paginatedRecipes = recipes.slice(startIdx, endIdx + 1);

    return (
      <>
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
                params={recipeParams}
              />
            );
          })}
        </ul>
        {MAX_PAGES > 1 && (
          <Navigation
            recipeParams={recipeParams}
            page={page}
            maxPages={MAX_PAGES}
          />
        )}
      </>
    );
  }
}
