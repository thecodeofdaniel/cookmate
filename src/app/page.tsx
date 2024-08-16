// 'use client';

import { Button } from '@/components/ui/button';
import SearchForm from '@/components/SearchForm';
import Count from '@/components/Count';

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
    });
  };

  return (
    <div className="m-4">
      <SearchForm />
      <Count />
      <div className="flex flex-col gap-4">
        {/* <Button onClick={() => scrollToSection('hello')}>
          Scroll to hello
        </Button> */}
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button className="text-red-500" id="hello">
          Here
        </Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
      </div>
    </div>
  );
}
