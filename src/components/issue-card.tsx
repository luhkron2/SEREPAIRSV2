'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { Truck, Calendar, User, MessageSquare, Wrench } from 'lucide-react';
import { formatMelbourneShort } from '@/lib/time';
import { Issue } from '@prisma/client';
import Link from 'next/link';

interface IssueCardProps {
  issue: Issue;
  onSchedule?: () => void;
  onComment?: () => void;
  onAssign?: () => void;
}

export function IssueCard({ issue, onSchedule, onComment, onAssign }: IssueCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow rounded-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1">
            <Link 
              href={`/issues/${issue.id}`}
              className="font-semibold text-sm hover:underline"
            >
              #{issue.ticket} - {issue.fleetNumber}
            </Link>
            {(issue.trailerA || issue.trailerB) && (
              <p className="text-xs text-muted-foreground">
                Trailers: {[issue.trailerA, issue.trailerB].filter(Boolean).join(' / ')}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 items-end">
            <SeverityBadge severity={issue.severity} showIcon />
            <StatusBadge status={issue.status} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{issue.category}</p>
          <p className="text-sm line-clamp-2">{issue.description}</p>
        </div>

        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="w-3 h-3" />
            <span>{issue.driverName}</span>
          </div>
          {issue.location && (
            <div className="flex items-center gap-2">
              <Truck className="w-3 h-3" />
              <span className="line-clamp-1">{issue.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="w-3 h-3" />
            <span>{formatMelbourneShort(issue.createdAt)}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          {onSchedule && (
            <Button
              size="sm"
              variant="outline"
              onClick={onSchedule}
              className="flex-1 text-xs"
            >
              <Wrench className="w-3 h-3 mr-1" />
              Schedule
            </Button>
          )}
          {onComment && (
            <Button
              size="sm"
              variant="outline"
              onClick={onComment}
              className="flex-1 text-xs"
            >
              <MessageSquare className="w-3 h-3 mr-1" />
              Comment
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

