'use client';

import SelectForm from '@/components/SelectForm';
import ShowRecipes from '@/components/ShowRecipes';
import ShowRecipesServer from '@/components/ShowRecipesServer';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ServerComponent from '@/components/ServerComponent';

export default function Home() {
  const searchParams = useSearchParams();
  const ingredientsArray = searchParams.getAll('i');

  const params =
    ingredientsArray.length > 0
      ? ingredientsArray.join('&i=')
      : (searchParams.get('c') ?? searchParams.get('a') ?? '');

  return (
    <>
      <div className="m-2 border-2 border-green-500">
        <SelectForm searchParams={params} />
        {/* <ShowRecipes url={url} /> */}
        {/* <Suspense fallback={<p>Loading recipes...</p>}>
          <ShowRecipesServer
            ingredients={searchParams.getAll('i')}
            category={searchParams.get('c')}
            area={searchParams.get('a')}
          />
        </Suspense> */}
        <ServerComponent
          ingredients={searchParams.getAll('i')}
          category={searchParams.get('c')}
          area={searchParams.get('a')}
        />
      </div>
    </>
  );
}
