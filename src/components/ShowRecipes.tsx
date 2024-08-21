'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchRecipes, Recipe as TRecipe } from '@/lib/fetch';

export default function ShowRecipes({ url }: { url: string }) {
  const { data: recipes, isLoading } = useQuery({
    queryKey: ['recipes', url],
    queryFn: () => fetchRecipes(url),
    staleTime: Infinity,
    enabled: !!url,
  });

  console.log(recipes);

  return (
    <>
      <p>URL: {url}</p>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !recipes && url !== '' && <p>No recipes found!</p>}
      {!isLoading && recipes && (
        <ul className="space-y-2">
          {recipes?.map((recipe) => {
            return <Recipe key={recipe.idMeal} recipe={recipe} />;
          })}
        </ul>
      )}
    </>
  );
}

function Recipe({ recipe }: { recipe: TRecipe }) {
  return (
    <div>
      <p>{recipe.strMeal}</p>
      <p>{recipe.strMealThumb}</p>
    </div>
  );
}
