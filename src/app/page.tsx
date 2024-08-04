import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <>
      <h1>Home page</h1>
      <Button asChild>
        <Link href={'/blog'}>Click Me</Link>
      </Button>
    </>
  );
}
