import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { addDays } from 'date-fns';
import { FLEET_DATA, TRAILERS, DRIVERS } from '../src/lib/fleet-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  console.log('🗑️ Clearing existing data...');
  await prisma.issue.deleteMany();
  await prisma.workOrder.deleteMany();
  await prisma.mapping.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Cleared existing data');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create users
  const workshopUser = await prisma.user.upsert({
    where: { email: 'workshop@example.com' },
    update: {},
    create: {
      email: 'workshop@example.com',
      username: 'workshop',
      name: 'Workshop Team',
      password: hashedPassword,
      role: 'WORKSHOP',
    },
  });

  const opsUser = await prisma.user.upsert({
    where: { email: 'ops@example.com' },
    update: {},
    create: {
      email: 'ops@example.com',
      username: 'ops',
      name: 'Operations Team',
      password: hashedPassword,
      role: 'OPERATIONS',
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const driverUser = await prisma.user.upsert({
    where: { email: 'driver@example.com' },
    update: {},
    create: {
      email: 'driver@example.com',
      username: 'driver',
      name: 'Test Driver',
      password: hashedPassword,
      role: 'DRIVER',
      phone: '+61 412 345 678',
    },
  });

  console.log('✅ Created users');

  // Create driver mappings from comprehensive fleet data
  for (const driver of DRIVERS) {
    await prisma.mapping.upsert({
      where: {
        kind_key: {
          kind: 'driver',
          key: driver.name,
        },
      },
      update: {},
      create: {
        kind: 'driver',
        key: driver.name,
        value: JSON.stringify({ 
          phone: driver.phone,
          employeeId: driver.employeeId,
          status: driver.status
        }),
      },
    });
  }

  console.log('✅ Created driver mappings');

  // Create fleet mappings from comprehensive fleet data
  for (const fleet of FLEET_DATA) {
    await prisma.mapping.upsert({
      where: {
        kind_key: {
          kind: 'fleet',
          key: fleet.fleetNumber,
        },
      },
      update: {},
      create: {
        kind: 'fleet',
        key: fleet.fleetNumber,
        value: JSON.stringify({ 
          rego: fleet.registration,
          type: fleet.type,
          status: fleet.status,
          location: fleet.location,
          driver: fleet.driver,
          phone: fleet.phone
        }),
      },
    });
  }

  console.log('✅ Created fleet mappings');

  // Create individual trailer mappings
  for (const trailer of TRAILERS) {
    await prisma.mapping.upsert({
      where: {
        kind_key: {
          kind: 'trailer',
          key: trailer.fleetNumber,
        },
      },
      update: {},
      create: {
        kind: 'trailer',
        key: trailer.fleetNumber,
        value: JSON.stringify({
          rego: trailer.registration,
          type: trailer.type,
          status: trailer.status,
          location: trailer.location
        }),
      },
    });
  }

  console.log('✅ Created trailer mappings');

  // Create a critical issue
  const criticalIssue = await prisma.issue.create({
    data: {
      ticket: 1001,
      status: 'PENDING',
      severity: 'CRITICAL',
      category: 'Mechanical',
      description: 'Engine overheating, temperature gauge in red zone. Coolant level appears normal but engine temperature keeps rising.',
      safeToContinue: 'No',
      location: 'M1 Southbound, near Coomera (QLD)',
      fleetNumber: 'XW16GH',
      primeRego: 'ABC123',
      trailerA: 'REG58A',
      trailerB: 'REG58B',
      driverName: 'John Smith',
      driverPhone: '+61 412 345 678',
      preferredFrom: addDays(new Date(), 1),
      preferredTo: addDays(new Date(), 2),
      media: {
        create: [
          {
            url: '/placeholder-engine.jpg',
            type: 'image/jpeg',
          },
          {
            url: '/placeholder-gauge.jpg',
            type: 'image/jpeg',
          },
        ],
      },
    },
  });

  console.log('✅ Created critical issue');

  // Create a second issue for work order demo
  const secondIssue = await prisma.issue.create({
    data: {
      ticket: 1002,
      status: 'PENDING',
      severity: 'MEDIUM',
      category: 'Tyres',
      description: 'Left rear tyre showing signs of uneven wear on outer edge',
      safeToContinue: 'Yes',
      location: 'Melbourne Depot',
      fleetNumber: 'XW17GH',
      primeRego: 'DEF456',
      trailerA: 'REG63A',
      trailerB: 'REG63B',
      driverName: 'Sarah Johnson',
      driverPhone: '+61 423 456 789',
    },
  });

  console.log('✅ Created second issue');

  // Create work orders on calendar
  const tomorrow = addDays(new Date(), 1);
  const dayAfter = addDays(new Date(), 2);

  const workOrder1 = await prisma.workOrder.create({
    data: {
      issueId: criticalIssue.id,
      status: 'SCHEDULED',
      startAt: new Date(tomorrow.setHours(9, 0, 0, 0)),
      endAt: new Date(tomorrow.setHours(12, 0, 0, 0)),
      workshopSite: 'Melbourne',
      assignedToId: workshopUser.id,
      workType: 'Engine Diagnostics & Repair',
      notes: 'Priority job - check cooling system, radiator, and thermostat',
    },
  });

  // Update first issue to SCHEDULED
  await prisma.issue.update({
    where: { id: criticalIssue.id },
    data: { status: 'SCHEDULED' },
  });

  const workOrder2 = await prisma.workOrder.create({
    data: {
      issueId: secondIssue.id,
      status: 'SCHEDULED',
      startAt: new Date(dayAfter.setHours(13, 0, 0, 0)),
      endAt: new Date(dayAfter.setHours(16, 0, 0, 0)),
      workshopSite: 'Sydney',
      assignedToId: workshopUser.id,
      workType: 'Tyre Inspection & Replacement',
      notes: 'Check alignment and replace if necessary',
    },
  });

  // Update second issue to SCHEDULED
  await prisma.issue.update({
    where: { id: secondIssue.id },
    data: { status: 'SCHEDULED' },
  });

  console.log('✅ Created work orders');

  console.log('🎉 Seeding complete!');
  console.log('\n📋 Test Accounts:');
  console.log('  workshop@example.com / password123');
  console.log('  ops@example.com / password123');
  console.log('  admin@example.com / password123');
  console.log('  driver@example.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

