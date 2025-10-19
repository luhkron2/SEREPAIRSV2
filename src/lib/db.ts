import { PrismaClient } from '@prisma/client';
import { Logger } from './logger';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Add connection health check
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    Logger.info('Database connection healthy');
    return true;
  } catch (error) {
    Logger.error('Database connection failed:', error);
    return false;
  }
}

// Note: Graceful shutdown is handled by Next.js automatically

