'use client';

import { useSearchParams } from 'next/navigation';

import Search from './SearchForm';
import Recipes from './Recipes';

//------------------------------------------------------------------------------
export default function HomePage() {
  // console.log('Render: Homepage');

  const nextSearchParams = useSearchParams();

  const ingredients =
    nextSearchParams.getAll('i').length !== 0
      ? nextSearchParams.getAll('i')
      : null;
  const category = nextSearchParams.get('c');
  const area = nextSearchParams.get('a');
  let page = nextSearchParams.get('page') ?? '1';

  let recipeParams = '';

  if (ingredients) {
    recipeParams += '?i=' + ingredients.join('&i=');
  } else if (category) {
    recipeParams += '?c=' + category;
  } else if (area) {
    recipeParams += '?a=' + area;
  }

  return (
    <>
      <div className="m-4 flex flex-1 flex-col">
        <Search
          ingredients={ingredients ? ingredients.join(',') : ingredients}
          category={category}
          area={area}
          recipeParams={recipeParams}
          className="flex flex-col gap-2 md:flex-row md:items-center"
        />
        <Recipes
          recipeParams={recipeParams}
          page={+page}
          className="flex-1-px overflow-auto"
        />
      </div>
    </>
  );
}
