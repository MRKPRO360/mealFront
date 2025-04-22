import { cn } from '@/lib/utils';

function FTSectionHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        'text-3xl font-medium text-gray-900 sm:text-4xl',
        className
      )}
    >
      {children}
    </h2>
  );
}

export default FTSectionHeader;
