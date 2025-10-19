import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/../auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, startAt, endAt, ...otherFields } = body;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { ...otherFields };
    
    if (status) {
      updateData.status = status;
    }
    if (startAt) {
      updateData.startAt = new Date(startAt);
    }
    if (endAt) {
      updateData.endAt = new Date(endAt);
    }

    const workOrder = await prisma.workOrder.update({
      where: { id },
      data: updateData,
      include: {
        issue: true,
        assignedTo: true,
      },
    });

    // Sync issue status with work order status
    if (status) {
      await prisma.issue.update({
        where: { id: workOrder.issueId },
        data: { status },
      });
    }

    return NextResponse.json(workOrder);
  } catch (error) {
    console.error('Error updating work order:', error);
    return NextResponse.json(
      { error: 'Failed to update work order' },
      { status: 500 }
    );
  }
}

