import Card from './Card';
import GlassCard from './GlassCard';

export default function Navbar() {
  return (
    <>
      <GlassCard className="absolute w-full">
        <nav className="p-4">
          <div className="container flex justify-between">
            <h1>Guides/Tutorials</h1>
            <ul className="flex gap-8">
              <li>About</li>
              <li>Blog</li>
            </ul>
          </div>
        </nav>
      </GlassCard>
    </>
  );
}
