import { cn } from '@/lib/utils';

type GlassCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        'bg-zinc-900 bg-opacity-70 shadow-lg backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
