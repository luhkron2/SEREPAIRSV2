'use client';

import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { WorkOrderCard } from '@/components/work-order-card';
import { CreateWorkOrderDialog } from '@/components/create-work-order-dialog';
import { toast } from 'sonner';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function SchedulePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
    fetchUsers();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/workorders');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      // You would create a /api/users endpoint, but for now we'll use a placeholder
      setUsers([]);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleEventClick = (info: any) => {
    const workOrder = info.event.extendedProps.workOrder;
    setSelectedWorkOrder(workOrder);
    setDialogOpen(true);
  };

  const handleEventDrop = async (info: any) => {
    try {
      const response = await fetch(`/api/workorders/${info.event.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startAt: info.event.start?.toISOString(),
          endAt: info.event.end?.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update');
      }

      toast.success('Work order rescheduled');
      fetchEvents();
    } catch (error) {
      info.revert();
      toast.error('Failed to reschedule');
    }
  };

  const handleEventResize = async (info: any) => {
    try {
      const response = await fetch(`/api/workorders/${info.event.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startAt: info.event.start?.toISOString(),
          endAt: info.event.end?.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update');
      }

      toast.success('Duration updated');
      fetchEvents();
    } catch (error) {
      info.revert();
      toast.error('Failed to update duration');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/workshop">
                <Button variant="ghost" size="sm">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Workshop
                </Button>
              </Link>
              <h1 className="text-xl font-bold">Work Order Schedule</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-card rounded-2xl p-6 border">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            timeZone="Australia/Melbourne"
            editable={true}
            droppable={true}
            events={events}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventResize={handleEventResize}
            height="auto"
            slotMinTime="06:00:00"
            slotMaxTime="20:00:00"
          />
        </div>
      </div>

      {selectedWorkOrder && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Work Order Details</DialogTitle>
            </DialogHeader>
            <WorkOrderCard
              workOrder={selectedWorkOrder}
              onUpdate={() => {
                fetchEvents();
                setDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

