import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import GlassCard from '@/components/GlassCard';
import Card from '@/components/Card';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <div className="container flex h-full items-center justify-center">
        <GlassCard className="flex flex-col items-center justify-center gap-8 rounded-md border p-16 sm:flex-row">
          <Avatar className="h-48 w-48 sm:h-64 sm:w-64">
            <AvatarImage src="https://avatars.githubusercontent.com/u/100104016?v=4" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-center text-xl font-medium sm:text-left sm:text-2xl">
            <p>My name is</p>
            <h2 className="text-6xl font-bold sm:text-7xl md:text-8xl">
              Daniel Rubio
            </h2>
            <p>and these are my guides/tutorials :)</p>
          </div>
        </GlassCard>
      </div>
      <div className="flex flex-col gap-4">
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
      </div>
    </>
  );
}
