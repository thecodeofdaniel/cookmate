'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import {
  createURLfromParams,
  fetchRecipes,
  fetchSingleRecipe,
  TFetchedRecipe as TRecipe,
} from '@/lib/fetch';
import Ingredients from '@/components/Ingredients';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { cn } from '@/lib/utils';

type Props = {
  params: string;
  className?: string;
};

export default function Recipes({ params, className }: Props) {
  const url = createURLfromParams(params);

  const { data: recipes, isLoading } = useQuery({
    queryKey: ['recipes', url],
    queryFn: () => fetchRecipes(url),
    staleTime: Infinity,
    enabled: url !== '',
  });

  if (url === '') {
    return <p className={cn(className)}>Search for some recipes!</p>;
  }

  return (
    <>
      {isLoading && <p className={cn(className)}>Loading recipes...</p>}
      {!isLoading && !recipes && <p>No recipes found :(</p>}
      {!isLoading && recipes && (
        <ul className={cn(className, 'flex flex-wrap justify-center gap-2')}>
          {recipes?.map((recipe) => {
            return (
              <Recipe
                key={recipe.idMeal}
                fetchedRecipe={recipe}
                params={params}
              />
            );
            // return <li key={recipe.idMeal}>{recipe.idMeal}</li>;
          })}
        </ul>
      )}
    </>
  );
}

function Recipe({
  fetchedRecipe,
  params,
}: {
  fetchedRecipe: TRecipe;
  params: string;
}) {
  const { idMeal, strMeal, strMealThumb } = fetchedRecipe;

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', idMeal],
    queryFn: () => fetchSingleRecipe(idMeal),
    staleTime: Infinity,
  });

  return (
    <li className="w-96 rounded-md border-2 border-cyan-400">
      <Image
        src={strMealThumb}
        alt="External Image"
        width={300}
        height={300}
        className="mx-auto"
        priority
      />
      <div className="text-wrap text-center">
        <p className="text-xl font-bold">{strMeal}</p>
        {/* <p>{fetchedRecipe.strMealThumb}</p> */}
        {/* <p>www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}</p> */}
        {isLoading && <p>Fetching more info...</p>}
        {recipe && (
          <div className="">
            <p>Category: {recipe.strCategory}</p>
            <p>Area: {recipe.strArea}</p>
            {/* <Ingredients meal={recipe} /> */}
            {/* <Link href={`/${idMeal}/${params}`}>Open</Link> */}
            <Dialog>
              <DialogTrigger>Open</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-black">
                    {recipe?.strMeal}
                  </DialogTitle>
                  <DialogDescription>
                    {recipe?.strInstructions}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </li>
  );
}
