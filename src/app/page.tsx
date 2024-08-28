'use client';

import { useSearchParams } from 'next/navigation';

import Search from './SearchForm';
import Recipes from './Recipes';

//------------------------------------------------------------------------------
export default function page() {
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

  return (
    <>
      <div className="m-2 flex flex-1 flex-col border-2 border-green-500">
        <Search
          ingredients={ingredients.length > 0 ? ingredients.join(',') : null}
          category={category}
          area={area}
          className="flex flex-col gap-2 md:flex-row md:items-center"
        />
        <Recipes params={params} className="flex-1-px overflow-auto" />
      </div>
    </>
  );
}
