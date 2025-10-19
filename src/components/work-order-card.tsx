'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { MapPin, User, Calendar, Play, CheckCircle, X } from 'lucide-react';
import { formatMelbourneShort } from '@/lib/time';
import { WorkOrder, Issue, User as PrismaUser } from '@prisma/client';
import Link from 'next/link';
import { toast } from 'sonner';
import { useState } from 'react';

interface WorkOrderCardProps {
  workOrder: WorkOrder & {
    issue: Issue;
    assignedTo?: PrismaUser | null;
  };
  onUpdate?: () => void;
}

export function WorkOrderCard({ workOrder, onUpdate }: WorkOrderCardProps) {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/workorders/${workOrder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update work order');
      }

      toast.success(`Work order ${newStatus.toLowerCase()}`);
      onUpdate?.();
    } catch (error) {
      toast.error('Failed to update work order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1">
            <Link 
              href={`/issues/${workOrder.issue.id}`}
              className="font-semibold text-sm hover:underline"
            >
              WO: #{workOrder.issue.ticket} - {workOrder.issue.fleetNumber}
            </Link>
            <p className="text-xs text-muted-foreground">{workOrder.workType}</p>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <SeverityBadge severity={workOrder.issue.severity} />
            <StatusBadge status={workOrder.status} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>
              {formatMelbourneShort(workOrder.startAt)} - {formatMelbourneShort(workOrder.endAt)}
            </span>
          </div>
          {workOrder.workshopSite && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span>{workOrder.workshopSite}</span>
            </div>
          )}
          {workOrder.assignedTo && (
            <div className="flex items-center gap-2">
              <User className="w-3 h-3" />
              <span>{workOrder.assignedTo.name || 'Unnamed'}</span>
            </div>
          )}
        </div>

        {workOrder.notes && (
          <p className="text-sm text-muted-foreground line-clamp-2">{workOrder.notes}</p>
        )}

        <div className="flex gap-2 pt-2">
          {workOrder.status === 'SCHEDULED' && (
            <Button
              size="sm"
              variant="default"
              onClick={() => handleStatusChange('IN_PROGRESS')}
              disabled={loading}
              className="flex-1 text-xs"
            >
              <Play className="w-3 h-3 mr-1" />
              Start
            </Button>
          )}
          {workOrder.status === 'IN_PROGRESS' && (
            <Button
              size="sm"
              variant="default"
              onClick={() => handleStatusChange('COMPLETED')}
              disabled={loading}
              className="flex-1 text-xs"
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Complete
            </Button>
          )}
          {(workOrder.status === 'SCHEDULED' || workOrder.status === 'IN_PROGRESS') && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusChange('CANCELLED')}
              disabled={loading}
              className="text-xs"
            >
              <X className="w-3 h-3 mr-1" />
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

