import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

import Ingredients from '@/components/Ingredients';

import { fetchSingleRecipe } from '@/lib/fetch';
import { Suspense } from 'react';

import mealsData from '../../../public/meal.json';

type Props = {
  params: {
    idMeal: string;
  };
};

export default async function Page({ params }: Props) {
  const { idMeal } = params;

  // const recipe = await fetchSingleRecipe(idMeal);
  const recipe = mealsData;
  // console.log(recipe);

  return (
    <Suspense fallback={<p>Loading recipe...</p>}>
      <div className="flex flex-1-px flex-col gap-4 overflow-auto border-2 border-red-500 p-4 md:flex-row">
        <Image
          src={recipe.strMealThumb}
          alt="External Image"
          width={400}
          height={400}
          className="mx-auto rounded-md md:mx-0 md:mb-auto"
          priority
        />
        <div className="flex w-full flex-col border-2 border-yellow-500">
          <div className="flex flex-col gap-x-2 xl:flex-row">
            <h2 className="text-2xl font-bold lg:text-3xl">{recipe.strMeal}</h2>
            <div className="flex items-center gap-2">
              <Badge className="bg-stone-700">
                Category: {recipe.strCategory}
              </Badge>
              <Badge className="bg-stone-700">Area: {recipe.strArea}</Badge>
            </div>
          </div>

          <div className="mt-2 flex flex-1 flex-col gap-4 border-2 border-green-500 xl:flex-row">
            <Ingredients meal={recipe} className="flex-1" />
            <Textarea
              defaultValue={recipe.strInstructions}
              readOnly
              className="h-96 md:flex-2"
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
