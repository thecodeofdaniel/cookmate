// 'use client';

import { useSearchParams } from 'next/navigation';

import Search from './SearchForm';
import Recipes from './Recipes';

import { Suspense } from 'react';

//------------------------------------------------------------------------------
type Props = {
  searchParams: {
    i?: string | string[];
    c?: string;
    a?: string;
    page?: string;
  };
};

export default function HomePage({ searchParams }: Props) {
  // console.log('Render: Homepage');

  let ingredients = searchParams.i ?? null;
  let category = searchParams.c ?? null;
  let area = searchParams.a ?? null;
  let page = searchParams.page ?? '1';

  console.log('page', page);

  let recipeParams = '';

  if (ingredients && ingredients.length > 0) {
    if (Array.isArray(ingredients)) {
      recipeParams += '?i=' + ingredients.join('&i=');
    } else {
      recipeParams += '?i=' + ingredients;
    }
  } else if (category) {
    recipeParams += '?c=' + category;
  } else if (area) {
    recipeParams += '?a=' + area;
  }

  return (
    <div className="m-4 flex flex-1 flex-col">
      <Search
        ingredients={
          Array.isArray(ingredients) ? ingredients.join(',') : ingredients
        }
        category={category}
        area={area}
        recipeParams={recipeParams}
        className="flex flex-col gap-2 md:flex-row md:items-center"
      />
      <Suspense key={recipeParams} fallback={<p>Loading recipes...</p>}>
        <Recipes
          recipeParams={recipeParams}
          page={+page}
          className="flex-1-px overflow-auto"
        />
      </Suspense>
    </div>
  );
}
