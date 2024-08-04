import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <div className="flex flex-col gap-2 p-4">
        <Button asChild size="lg">
          <Link href={'/blog'}>Click Me</Link>
        </Button>
        <Button asChild size="lg">
          <Link href={'/blog'}>Click Me</Link>
        </Button>
        <Button asChild size="lg" variant="destructive">
          <Link href={'/blog'}>Click Me</Link>
        </Button>
      </div>
    </>
  );
}
