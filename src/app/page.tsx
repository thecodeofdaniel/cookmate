'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import CategoriesSelect from '@/components/CategoriesSelect';
import AreasSelect from '@/components/AreasSelect';

export default function Home() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e.target);
  };

  return (
    <form
      className="m-4 flex flex-col gap-2 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Enter some ingredients (e.g. salt, pepper, chicken)"
        name="ingredients"
      />
      <div className="flex-1">{/* <CategoriesSelect /> */}</div>
      <div className="flex-1">{/* <AreasSelect /> */}</div>
      <Button>Search</Button>
    </form>
  );
}
