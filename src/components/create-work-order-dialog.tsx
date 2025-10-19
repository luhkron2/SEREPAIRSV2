'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const workOrderSchema = z.object({
  issueId: z.string(),
  startAt: z.string(),
  endAt: z.string(),
  workshopSite: z.string(),
  workType: z.string().optional(),
  notes: z.string().optional(),
  assignedToId: z.string().optional(),
});

type WorkOrderForm = z.infer<typeof workOrderSchema>;

interface CreateWorkOrderDialogProps {
  issueId: string;
  issueTitle: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  users?: Array<{ id: string; name: string | null }>;
}

export function CreateWorkOrderDialog({
  issueId,
  issueTitle,
  trigger,
  onSuccess,
  users = [],
}: CreateWorkOrderDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<WorkOrderForm>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      issueId,
    },
  });

  const onSubmit = async (data: WorkOrderForm) => {
    setLoading(true);
    try {
      const response = await fetch('/api/workorders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create work order');
      }

      toast.success('Work order created successfully');
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create work order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Schedule Work Order</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Work Order</DialogTitle>
          <DialogDescription>
            Schedule work for issue: {issueTitle}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startAt">Start Date/Time</Label>
              <Input
                id="startAt"
                type="datetime-local"
                {...register('startAt')}
              />
              {errors.startAt && (
                <p className="text-sm text-destructive">{errors.startAt.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endAt">End Date/Time</Label>
              <Input
                id="endAt"
                type="datetime-local"
                {...register('endAt')}
              />
              {errors.endAt && (
                <p className="text-sm text-destructive">{errors.endAt.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="workshopSite">Workshop Location</Label>
            <Select onValueChange={(value) => setValue('workshopSite', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Melbourne">Melbourne</SelectItem>
                <SelectItem value="Sydney">Sydney</SelectItem>
                <SelectItem value="Brisbane">Brisbane</SelectItem>
              </SelectContent>
            </Select>
            {errors.workshopSite && (
              <p className="text-sm text-destructive">{errors.workshopSite.message}</p>
            )}
          </div>

          {users.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="assignedToId">Assign To</Label>
              <Select onValueChange={(value) => setValue('assignedToId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select technician" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name || 'Unnamed User'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="workType">Work Type</Label>
            <Input
              id="workType"
              placeholder="e.g., Engine Repair, Tyre Replacement"
              {...register('workType')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional notes or instructions..."
              rows={3}
              {...register('notes')}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Work Order'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

