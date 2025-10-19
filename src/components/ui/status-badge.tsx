import { Badge } from '@/components/ui/badge';
import { Status } from '@prisma/client';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const statusConfig = {
  PENDING: { label: 'Pending', className: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20' },
  IN_PROGRESS: { label: 'In Progress', className: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20' },
  SCHEDULED: { label: 'Scheduled', className: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20' },
  COMPLETED: { label: 'Completed', className: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}

