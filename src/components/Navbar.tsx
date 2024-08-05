import Card from './Card';
import GlassCard from './GlassCard';

export default function Navbar() {
  return (
    <>
      <GlassCard className="p-4">
        <nav>
          <div className="container flex justify-between">
            <h1>Guides/Tutorials</h1>
            <ul className="flex gap-8">
              <li>About</li>
              <li>Blog</li>
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
