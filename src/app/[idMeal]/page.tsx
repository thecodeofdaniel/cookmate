// Nextjs
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';

// Shadcn/UI
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

// Components
import Ingredients from '@/components/Ingredients';

// Libraries
import { fetchSingleRecipe } from '@/lib/fetch';

import mealsData from '../../../public/meal.json';
import { Button } from '@/components/ui/button';

//------------------------------------------------------------------------------
type Props = {
  params: {
    idMeal: string;
  };
  searchParams: string;
};

// Function to generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const recipe = await fetchSingleRecipe(params.idMeal);

  if (!recipe) {
    return {
      title: 'Recipe Not Found',
    };
  }

  return {
    title: `${recipe.strMeal}`,
  };
}

export default async function RecipeDetailsPage({ params }: Props) {
  const recipe = await fetchSingleRecipe(params.idMeal);

  if (!recipe) {
    notFound();
  }

  return (
    <section className="m-4 flex flex-1-px flex-col gap-4 overflow-auto md:flex-row">
      <Image
        src={recipe.strMealThumb}
        alt="External Image"
        width={400}
        height={400}
        className="mx-auto rounded-md md:mx-0 md:mb-auto"
        priority
      />
      <div className="flex w-full flex-col">
        <div className="flex flex-col gap-x-2 xl:flex-row">
          <h2 className="text-2xl font-bold lg:text-3xl">{recipe.strMeal}</h2>
          <ul className="flex items-center gap-2">
            <li>
              <Badge className="bg-stone-700">
                Category: {recipe.strCategory}
              </Badge>
            </li>
            <li>
              <Badge className="bg-stone-700">Area: {recipe.strArea}</Badge>
            </li>
          </ul>
        </div>
        {recipe.strYoutube ? (
          <Button asChild>
            <a
              href={recipe.strYoutube}
              target="_blank"
              className="my-2 mr-auto border"
            >
              Watch Video
            </a>
          </Button>
        ) : (
          <div className="my-2" />
        )}
        <div className="flex flex-1 flex-col gap-4 xl:flex-row">
          <Ingredients meal={recipe} className="flex-1" />
          <Textarea
            defaultValue={recipe.strInstructions}
            readOnly
            className="h-96 md:flex-2"
          />
        </div>
      </div>
    </section>
  );
}
