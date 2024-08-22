'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { fetchRecipes, TFetchedRecipe as TRecipe } from '@/lib/fetch';
import { fetchRecipe } from '@/lib/fetch';

import Ingredients from './Ingredients';

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
            return <Recipe key={recipe.idMeal} fetchedRecipe={recipe} />;
          })}
        </ul>
      )}
    </>
  );
}

function Recipe({ fetchedRecipe }: { fetchedRecipe: TRecipe }) {
  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', fetchedRecipe.idMeal],
    queryFn: () => fetchRecipe(fetchedRecipe.idMeal),
    staleTime: Infinity,
  });

  console.log('Recipes', recipe);

  return (
    <div className="flex h-64 gap-2">
      <Image
        src={fetchedRecipe.strMealThumb}
        alt="External Image"
        width={300}
        height={300}
        className="overflow-hidden border"
      />
      <div className="overflow-auto border">
        <p className="text-xl font-bold">{fetchedRecipe.strMeal}</p>
        <p>{fetchedRecipe.strMealThumb}</p>
        <p>
          www.themealdb.com/api/json/v1/1/lookup.php?i={fetchedRecipe.idMeal}
        </p>
        {isLoading && <p>Fetching more info...</p>}
        {recipe && (
          <div className="">
            <p>Category: {recipe.strCategory}</p>
            <p>Area: {recipe.strArea}</p>
            <Ingredients meal={recipe} />
          </div>
        )}
      </div>
    </div>
  );
}
