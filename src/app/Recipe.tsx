// 'use client';

// Next
import Image from 'next/image';
import Link from 'next/link';

// // Tanstack
// import { useQuery } from '@tanstack/react-query';

// Shadcn
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Libraries
import { fetchSingleRecipe } from '@/lib/fetch';

// -----------------------------------------------------------------------------
type Props = {
  fetchedRecipe: TFetchedRecipe;
  // params: string;
};

export default async function Recipe({ fetchedRecipe }: Props) {
  const { idMeal, strMeal, strMealThumb } = fetchedRecipe;

  // const { data: recipe, isLoading } = useQuery({
  //   queryKey: ['recipe', idMeal],
  //   queryFn: () => fetchSingleRecipe(idMeal),
  //   staleTime: Infinity,
  // });

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
