import { Badge } from '@/components/ui/badge';
import { Severity } from '@prisma/client';
import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, Info, Zap } from 'lucide-react';

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
  showIcon?: boolean;
}

const severityConfig = {
  LOW: { 
    label: 'Low', 
    className: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
    icon: Info
  },
  MEDIUM: { 
    label: 'Medium', 
    className: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
    icon: AlertCircle
  },
  HIGH: { 
    label: 'High', 
    className: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20',
    icon: AlertTriangle
  },
  CRITICAL: { 
    label: 'Critical', 
    className: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
    icon: Zap
  },
};

export function SeverityBadge({ severity, className, showIcon = false }: SeverityBadgeProps) {
  const config = severityConfig[severity];
  const Icon = config.icon;
  
  return (
    <Badge variant="outline" className={cn(config.className, 'font-medium', className)}>
      {showIcon && <Icon className="w-3 h-3 mr-1" />}
      {config.label}
    </Badge>
  );
}

export function getSeverityColor(severity: Severity): string {
  const colors = {
    LOW: '#22c55e',
    MEDIUM: '#eab308',
    HIGH: '#f97316',
    CRITICAL: '#ef4444',
  };
  return colors[severity];
}

