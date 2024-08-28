import GlassCard from '../components/GlassCard';
import Link from 'next/link';

//------------------------------------------------------------------------------
export default function Navbar() {
  return (
    <>
      <GlassCard className="p-4">
        <nav className="container flex justify-between">
          <Link href="/" className="text-2xl font-bold">
            CookMate
          </Link>
        </nav>
      </GlassCard>
    </>
  );
}
