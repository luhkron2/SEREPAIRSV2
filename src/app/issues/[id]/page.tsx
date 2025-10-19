'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StatusBadge } from '@/components/ui/status-badge';
import { SeverityBadge } from '@/components/ui/severity-badge';
import { CreateWorkOrderDialog } from '@/components/create-work-order-dialog';
import { formatMelbourneShort } from '@/lib/time';
import { ArrowLeft, MessageSquare, Calendar, User } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function IssueDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [issue, setIssue] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchIssue();
    }
  }, [params.id]);

  const fetchIssue = async () => {
    try {
      const response = await fetch(`/api/issues/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setIssue(data);
      }
    } catch (error) {
      console.error('Failed to fetch issue:', error);
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/issues/${params.id}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: comment }),
      });

      if (response.ok) {
        toast.success('Comment added');
        setComment('');
        fetchIssue();
      }
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  if (!issue) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/workshop">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Workshop
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="space-y-6">
          {/* Issue Header */}
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">Issue #{issue.ticket}</CardTitle>
                  <p className="text-muted-foreground mt-1">
                    {issue.fleetNumber} - {issue.category}
                  </p>
                </div>
                <div className="flex gap-2">
                  <StatusBadge status={issue.status} />
                  <SeverityBadge severity={issue.severity} showIcon />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Driver</p>
                    <p className="flex items-center gap-2 mt-1">
                      <User className="w-4 h-4" />
                      {issue.driverName}
                    </p>
                    {issue.driverPhone && <p className="text-sm text-muted-foreground">{issue.driverPhone}</p>}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Fleet Information</p>
                    <p className="mt-1">Fleet: {issue.fleetNumber}</p>
                    {issue.primeRego && <p className="text-sm">Rego: {issue.primeRego}</p>}
                    {(issue.trailerA || issue.trailerB) && (
                      <p className="text-sm">
                        Trailers: {[issue.trailerA, issue.trailerB].filter(Boolean).join(' / ')}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {issue.location && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Location</p>
                      <p className="mt-1">{issue.location}</p>
                    </div>
                  )}

                  {issue.safeToContinue && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Safe to Continue?</p>
                      <p className="mt-1">{issue.safeToContinue}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Reported</p>
                    <p className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" />
                      {formatMelbourneShort(issue.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Description</p>
                <p className="text-sm">{issue.description}</p>
              </div>

              {issue.media && issue.media.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Media</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {issue.media.map((media: any) => (
                      <div key={media.id} className="aspect-video bg-muted rounded-lg overflow-hidden">
                        {media.type.startsWith('image/') ? (
                          <img src={media.url} alt="Issue media" className="w-full h-full object-cover" />
                        ) : (
                          <video src={media.url} controls className="w-full h-full object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <CreateWorkOrderDialog
                  issueId={issue.id}
                  issueTitle={`#${issue.ticket} - ${issue.fleetNumber}`}
                  onSuccess={fetchIssue}
                  trigger={<Button>Schedule Work Order</Button>}
                />
              </div>
            </CardContent>
          </Card>

          {/* Work Orders */}
          {issue.workOrders && issue.workOrders.length > 0 && (
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Work Orders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {issue.workOrders.map((wo: any) => (
                  <div key={wo.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{wo.workType || 'Work Order'}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatMelbourneShort(wo.startAt)} - {formatMelbourneShort(wo.endAt)}
                        </p>
                        {wo.workshopSite && <p className="text-sm">Location: {wo.workshopSite}</p>}
                        {wo.assignedTo && <p className="text-sm">Assigned to: {wo.assignedTo.name}</p>}
                      </div>
                      <StatusBadge status={wo.status} />
                    </div>
                    {wo.notes && <p className="text-sm text-muted-foreground mt-2">{wo.notes}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Comments */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {issue.comments && issue.comments.length > 0 ? (
                <div className="space-y-4">
                  {issue.comments.map((comment: any) => (
                    <div key={comment.id} className="border-l-2 border-primary/20 pl-4 py-2">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium">{comment.author?.name || 'Unknown'}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatMelbourneShort(comment.createdAt)}
                        </p>
                      </div>
                      <p className="text-sm">{comment.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No comments yet</p>
              )}

              <div className="space-y-2 pt-4 border-t">
                <Textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
                <Button onClick={handleAddComment} disabled={loading || !comment.trim()}>
                  Add Comment
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

