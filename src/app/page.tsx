'use client';

import SelectForm from '@/components/SelectForm';
import ShowRecipes from '@/components/ShowRecipes';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');

  return (
    <>
      <div className="m-2 border-2 border-green-500">
        <SelectForm setUrl={setUrl} />
        <ShowRecipes url={url} />
      </div>
    </>
  );
}
