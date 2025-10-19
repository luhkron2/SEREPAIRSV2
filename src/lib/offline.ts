import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface OfflineDB extends DBSchema {
  issues: {
    key: string;
    value: {
      id: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: any;
      timestamp: number;
      retries: number;
    };
  };
}

let db: IDBPDatabase<OfflineDB> | null = null;

async function getDB() {
  if (db) return db;
  
  db = await openDB<OfflineDB>('se-repairs-offline', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('issues')) {
        db.createObjectStore('issues', { keyPath: 'id' });
      }
    },
  });
  
  return db;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function queueIssue(data: any): Promise<string> {
  const db = await getDB();
  const id = `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  await db.add('issues', {
    id,
    data,
    timestamp: Date.now(),
    retries: 0,
  });
  
  return id;
}

export async function retryQueue(): Promise<{ success: number; failed: number }> {
  const db = await getDB();
  const allIssues = await db.getAll('issues');
  
  let success = 0;
  let failed = 0;
  
  for (const item of allIssues) {
    try {
      const response = await fetch('/api/issues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item.data),
      });
      
      if (response.ok) {
        await db.delete('issues', item.id);
        success++;
        console.log(`✅ Offline issue synced: ${item.id}`);
      } else {
        const errorText = await response.text();
        console.warn(`⚠️ Failed to sync offline issue ${item.id}:`, errorText);
        
        // Increment retries
        item.retries++;
        if (item.retries > 5) {
          // Give up after 5 retries
          await db.delete('issues', item.id);
          failed++;
          console.error(`❌ Giving up on offline issue ${item.id} after 5 retries`);
        } else {
          await db.put('issues', item);
        }
      }
    } catch (error) {
      console.error(`❌ Network error syncing offline issue ${item.id}:`, error);
      
      // Network error, increment retries
      item.retries++;
      if (item.retries > 5) {
        await db.delete('issues', item.id);
        failed++;
      } else {
        await db.put('issues', item);
      }
    }
  }
  
  return { success, failed };
}

export async function getQueueLength(): Promise<number> {
  const db = await getDB();
  const count = await db.count('issues');
  return count;
}

export async function clearQueue(): Promise<void> {
  const db = await getDB();
  await db.clear('issues');
}

