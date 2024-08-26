'use client';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { fetchSingleRecipe } from '@/lib/fetch';

export default function MealDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ingredients = searchParams.getAll('i');
  const category = searchParams.get('c');
  const area = searchParams.get('a');

  let params = '';

  if (ingredients.length > 0) {
    params += '?i=' + ingredients.join('&i=');
  } else if (category) {
    params += '?c=' + category;
  } else if (area) {
    params += '?a=' + area;
  }

  console.log(params);

  let { idMeal } = useParams<{ idMeal: string }>();
  console.log(idMeal);

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', idMeal],
    queryFn: () => fetchSingleRecipe(idMeal),
    staleTime: Infinity,
  });

  console.log(recipe);

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  // onOpenChange={handleDialogClose}

  return (
    <Dialog open>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-black">{recipe?.strMeal}</DialogTitle>
          <DialogDescription>{recipe?.strInstructions}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.push(`/${params}`)}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
