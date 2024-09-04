import GlassCard from '../components/GlassCard';
import Link from 'next/link';

//------------------------------------------------------------------------------
export default function Navbar() {
  return (
    <>
      <nav>
        <GlassCard className="p-4">
          <section className="container flex justify-between">
            <Link href="/" className="text-2xl font-bold">
              CookMate
            </Link>
          </section>
        </GlassCard>
      </nav>
    </>
  );
}
