'use client';

import { useSearchParams } from 'next/navigation';

import Search from './SearchForm';
import Recipes from './Recipes';

//------------------------------------------------------------------------------
export default function HomePage() {
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
      <div className="m-4 flex flex-1 flex-col">
        <Search
          ingredients={ingredients.length > 0 ? ingredients.join(',') : null}
          category={category}
          area={area}
          className="flex flex-col gap-2 md:flex-row md:items-center"
        />
        <Recipes params={params} className="flex-1-px overflow-auto" />
        {/* <div className="mx-4 mt-auto flex justify-between border">
          <p>Prev</p>
          <p>Next</p>
        </div> */}
      </div>
    </>
  );
}
