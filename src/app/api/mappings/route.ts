import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/../auth';
import { z } from 'zod';

const mappingSchema = z.object({
  kind: z.enum(['driver', 'fleet', 'trailer']),
  key: z.string(),
  value: z.string(),
});

export async function GET() {
  try {
    const mappings = await prisma.mapping.findMany();

    // Group by kind
    const grouped = {
      drivers: {} as Record<string, { phone: string }>,
      fleets: {} as Record<string, { rego: string }>,
      trailers: {} as Record<string, { rego: string; type: string; status: string; location: string }>,
    };

    for (const mapping of mappings) {
      try {
        const value = JSON.parse(mapping.value);
        if (mapping.kind === 'driver') {
          grouped.drivers[mapping.key] = value;
        } else if (mapping.kind === 'fleet') {
          grouped.fleets[mapping.key] = value;
        } else if (mapping.kind === 'trailer') {
          grouped.trailers[mapping.key] = value;
        }
      } catch (e) {
        console.error('Error parsing mapping value:', e);
      }
    }

    return NextResponse.json(grouped);
  } catch (error) {
    console.error('Error fetching mappings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mappings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validated = mappingSchema.parse(body);

    const mapping = await prisma.mapping.upsert({
      where: {
        kind_key: {
          kind: validated.kind,
          key: validated.key,
        },
      },
      create: {
        kind: validated.kind,
        key: validated.key,
        value: validated.value,
      },
      update: {
        value: validated.value,
      },
    });

    return NextResponse.json(mapping);
  } catch (error) {
    console.error('Error saving mapping:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to save mapping' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const kind = searchParams.get('kind');
    const key = searchParams.get('key');

    if (!kind || !key) {
      return NextResponse.json({ error: 'Missing kind or key' }, { status: 400 });
    }

    await prisma.mapping.delete({
      where: {
        kind_key: {
          kind,
          key,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting mapping:', error);
    return NextResponse.json(
      { error: 'Failed to delete mapping' },
      { status: 500 }
    );
  }
}

