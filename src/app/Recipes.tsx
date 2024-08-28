'use client';

// Tanstack
import { useQuery } from '@tanstack/react-query';

// Components
import Recipe from './Recipe';

// Libraries
import { fetchRecipes } from '@/lib/fetch';
import { createFetchRecipesURL } from '@/lib/utils';

import { cn } from '@/lib/utils';

//------------------------------------------------------------------------------
type Props = {
  params: string;
  className?: string;
};

export default function Recipes({ params, className }: Props) {
  const url = createFetchRecipesURL(params);

  const { data: recipes, isLoading } = useQuery({
    queryKey: ['recipes', url],
    queryFn: () => fetchRecipes(url),
    staleTime: Infinity,
    enabled: url !== '',
  });

  if (url === '') {
    return <p>Search for some recipes!</p>;
  }

  return (
    <>
      {isLoading && <p>Loading recipes...</p>}
      {!isLoading && !recipes && <p>No recipes found :(</p>}
      {!isLoading && recipes && (
        <ul
          className={cn(
            className,
            'flex flex-wrap items-start justify-center gap-2',
          )}
        >
          {recipes?.map((recipe) => {
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
    </>
  );
}
