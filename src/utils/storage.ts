import Dexie, { Table } from 'dexie';

interface GearItem {
  id: number;
  name: string;
  weight: string;
  category: string;
}

interface SyncQueueItem {
  id?: number;
  action: 'create' | 'update' | 'delete';
  data: any;
  timestamp: number;
  retryCount?: number;
}

class GearDatabase extends Dexie {
  gearList!: Table<GearItem[], string>; // userId is the key
  syncQueue!: Table<SyncQueueItem>;

  constructor() {
    super('gearTracker');
    this.version(1).stores({
      gearList: 'userId',
      syncQueue: '++id, action, timestamp'
    });
  }
}

const db = new GearDatabase();

class StorageManager {
  private readonly LS_BACKUP_KEY = 'gearList_backup';

  async initialize() {
    try {
      await db.open();
      console.log('IndexedDB initialized');
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error);
      // Fall back to localStorage
    }
  }

  async saveGearList(userId: string, gearList: GearItem[]) {
    try {
      await db.gearList.put(gearList, userId);
      // Queue sync operation
      await this.queueSync('update', { userId, gearList });
      
      // Backup to localStorage
      localStorage.setItem(
        `${this.LS_BACKUP_KEY}_${userId}`,
        JSON.stringify(gearList)
      );
    } catch (error) {
      console.error('Error saving gear list:', error);
      throw error;
    }
  }

  async getGearList(userId: string): Promise<GearItem[]> {
    try {
      const list = await db.gearList.get(userId);
      if (list) return list;

      // Fall back to localStorage
      const backup = localStorage.getItem(`${this.LS_BACKUP_KEY}_${userId}`);
      return backup ? JSON.parse(backup) : [];
    } catch (error) {
      console.error('Error retrieving gear list:', error);
      return [];
    }
  }

  private async queueSync(action: 'create' | 'update' | 'delete', data: any) {
    try {
      await db.syncQueue.add({
        action,
        data,
        timestamp: Date.now(),
        retryCount: 0
      });
      await this.processSyncQueue();
    } catch (error) {
      console.error('Error queueing sync operation:', error);
    }
  }

  private async processSyncQueue() {
    try {
      const items = await db.syncQueue.toArray();

      for (const item of items) {
        try {
          await this.syncWithRedis(item);
          await db.syncQueue.delete(item.id!);
        } catch (error) {
          console.error('Failed to sync item:', error);
          // Leave failed items in queue for retry
          if ((item.retryCount ?? 0) >= 3) {
            await db.syncQueue.delete(item.id!);
          } else {
            await db.syncQueue.update(item.id!, {
              retryCount: (item.retryCount ?? 0) + 1
            });
          }
        }
      }
    } catch (error) {
      console.error('Error processing sync queue:', error);
    }
  }

  private async syncWithRedis(syncItem: SyncQueueItem) {
    // Assuming REDIS_URL is available in ENV
    const REDIS_URL = process.env.REDIS_URL;
    if (!REDIS_URL) {
      console.error('Redis URL not configured');
      return;
    }

    try {
      const response = await fetch(`${REDIS_URL}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(syncItem),
      });

      if (!response.ok) {
        throw new Error('Failed to sync with Redis');
      }
    } catch (error) {
      console.error('Redis sync failed:', error);
      throw error;
    }
  }
}

export const storageManager = new StorageManager();