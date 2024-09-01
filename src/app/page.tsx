'use client';

import { useSearchParams } from 'next/navigation';

import Search from './SearchForm';
import Recipes from './Recipes';

//------------------------------------------------------------------------------
export default function HomePage() {
  // console.log('Render: Homepage');

  const nextSearchParams = useSearchParams();

  const ingredients = nextSearchParams.getAll('i');
  const category = nextSearchParams.get('c');
  const area = nextSearchParams.get('a');
  let page = nextSearchParams.get('page') ?? '1';

  let searchParams = '';

  if (ingredients.length > 0) {
    searchParams += '?i=' + ingredients.join('&i=');
  } else if (category) {
    searchParams += '?c=' + category;
  } else if (area) {
    searchParams += '?a=' + area;
  }

  return (
    <>
      <div className="m-4 flex flex-1 flex-col">
        {/* Search adds the params onto url */}
        <Search
          ingredients={ingredients.length > 0 ? ingredients.join(',') : null}
          category={category}
          area={area}
          className="flex flex-col gap-2 md:flex-row md:items-center"
        />
        <Recipes
          searchParams={searchParams}
          page={+page}
          className="flex-1-px overflow-auto"
        />
      </div>
    </>
  );
}
