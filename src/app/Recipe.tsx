// Next
import Image from 'next/image';
import Link from 'next/link';

// Shadcn
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Libraries
import { fetchSingleRecipe } from '@/lib/fetch';

// Local data
import meal from '../../public/meal.json';

// -----------------------------------------------------------------------------
type Props = {
  fetchedRecipe: TFetchedRecipe;
};

export default async function Recipe({ fetchedRecipe }: Props) {
  const { idMeal, strMeal, strMealThumb } = fetchedRecipe;
  // const { idMeal, strMeal, strMealThumb } = meal;
  // const recipe = meal;

  const recipe = await fetchSingleRecipe(idMeal);

  return (
    <li className="flex h-[28rem] w-72 flex-col rounded-md border">
      <Image
        src={strMealThumb}
        alt="External Image"
        width={300}
        height={300}
        className="mx-auto overflow-hidden rounded-t-md"
        priority
      />
      <section className="mt-2 flex flex-1 flex-col text-center">
        <h2 className="text-center text-xl font-bold">{strMeal}</h2>
        {recipe && (
          <>
            <div className="flex justify-center gap-2">
              <Badge className="border-2 border-white">
                {recipe.strCategory}
              </Badge>
              <Badge className="border-2 border-white">{recipe.strArea}</Badge>
            </div>
            <Button className="mx-auto mb-2 mt-auto border" asChild>
              <Link href={`/${idMeal}`}>View More</Link>
            </Button>
          </>
        )}
      </section>
    </li>
  );
}
