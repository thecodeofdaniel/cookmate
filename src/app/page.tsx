'use client';

import Search from './search';
import Recipes from './recipes';
import { useSearchParams } from 'next/navigation';

export default function Home() {
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
    params += '?a=' + category;
  }

  return (
    <>
      <div className="m-2 border-2 border-green-500">
        <Search ingredients={ingredients} category={category} area={area} />
        <Recipes params={params} />
      </div>
    </>
  );
}
