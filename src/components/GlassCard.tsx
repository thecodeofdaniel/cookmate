import { cn } from '@/lib/utils';

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        'bg-zinc-950 bg-opacity-60 shadow-lg backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
