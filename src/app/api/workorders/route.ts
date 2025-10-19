import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/../auth';
import { z } from 'zod';

const workOrderSchema = z.object({
  issueId: z.string(),
  startAt: z.string(),
  endAt: z.string(),
  workshopSite: z.string().optional(),
  workType: z.string().optional(),
  notes: z.string().optional(),
  assignedToId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const workOrders = await prisma.workOrder.findMany({
      include: {
        issue: true,
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        startAt: 'asc',
      },
    });

    // Format for FullCalendar
    const events = workOrders.map((wo) => ({
      id: wo.id,
      title: `#${wo.issue.ticket} - ${wo.issue.fleetNumber}`,
      start: wo.startAt.toISOString(),
      end: wo.endAt.toISOString(),
      backgroundColor: getSeverityColor(wo.issue.severity),
      borderColor: getSeverityColor(wo.issue.severity),
      extendedProps: {
        workOrder: wo,
        issue: wo.issue,
      },
    }));

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching work orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch work orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = workOrderSchema.parse(body);

    // Create work order
    const workOrder = await prisma.workOrder.create({
      data: {
        issueId: validated.issueId,
        startAt: new Date(validated.startAt),
        endAt: new Date(validated.endAt),
        workshopSite: validated.workshopSite,
        workType: validated.workType,
        notes: validated.notes,
        assignedToId: validated.assignedToId,
      },
      include: {
        issue: true,
        assignedTo: true,
      },
    });

    // Update issue status to SCHEDULED
    await prisma.issue.update({
      where: { id: validated.issueId },
      data: { status: 'SCHEDULED' },
    });

    return NextResponse.json(workOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating work order:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create work order' },
      { status: 500 }
    );
  }
}

function getSeverityColor(severity: string): string {
  const colors: Record<string, string> = {
    LOW: '#22c55e',
    MEDIUM: '#eab308',
    HIGH: '#f97316',
    CRITICAL: '#ef4444',
  };
  return colors[severity] || '#6b7280';
}

