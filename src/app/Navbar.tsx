import GlassCard from '../components/GlassCard';
import Link from 'next/link';
import Image from 'next/image';

//------------------------------------------------------------------------------
export default function Navbar() {
  return (
    <nav>
      <GlassCard className="p-4">
        <section className="container flex justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/imgs/chefhat.png" // Adjust this path to where your image is stored
              alt="Chef Hat"
              width={30}
              height={30}
            />
            <span className="text-2xl font-bold">CookMate</span>
          </Link>
        </section>
      </GlassCard>
    </nav>
  );
}
