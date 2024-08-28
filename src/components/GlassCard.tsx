import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

//------------------------------------------------------------------------------
type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
};

export default function GlassCard({
  children,
  className,
  asChild = false,
}: GlassCardProps) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(
        'bg-zinc-900 bg-opacity-70 shadow-lg backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </Comp>
  );
}
