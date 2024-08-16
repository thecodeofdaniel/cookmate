import GlassCard from './GlassCard';
import Link from 'next/link';

export default function Navbar() {
  return (
    <>
      {/* Needs asChild prop */}
      <GlassCard className="p-4">
        <nav>
          <div className="container flex justify-between">
            <Link href="/">CookMate</Link>
            <ul className="flex gap-8">
              <li>
                <Link href="/blog">Saved Recipes</Link>
              </li>
            </ul>
          </div>
          {/* <aside>
            <ul className="justify-end space-y-1 pr-8 text-right">
              <li>About</li>
              <li>Blog</li>
            </ul>
          </aside> */}
        </nav>
      </GlassCard>
    </>
  );
}
