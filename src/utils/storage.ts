import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface GearItem {
  id: number;
  name: string;
  weight: string;
  category: string;
}

interface GearDB extends DBSchema {
  gearList: {
    key: string;
    value: GearItem[];
  };
  syncQueue: {
    key: number;
    value: {
      action: 'create' | 'update' | 'delete';
      data: any;
      timestamp: number;
    };
  };
}

class StorageManager {
  private db: IDBPDatabase<GearDB> | null = null;
  private readonly DB_NAME = 'gearTracker';
  private readonly STORE_NAME = 'gearList';
  private readonly SYNC_STORE = 'syncQueue';
  private readonly LS_BACKUP_KEY = 'gearList_backup';

  async initialize() {
    try {
      this.db = await openDB<GearDB>(this.DB_NAME, 1, {
        upgrade(db) {
          db.createObjectStore('gearList');
          db.createObjectStore('syncQueue', { autoIncrement: true });
        },
      });
      console.log('IndexedDB initialized');
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error);
      // Fall back to localStorage
      this.db = null;
    }
  }

  async saveGearList(userId: string, gearList: GearItem[]) {
    try {
      if (this.db) {
        await this.db.put(this.STORE_NAME, gearList, userId);
        // Queue sync operation
        await this.queueSync('update', { userId, gearList });
      }
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
      if (this.db) {
        const list = await this.db.get(this.STORE_NAME, userId);
        if (list) return list;
      }
      // Fall back to localStorage
      const backup = localStorage.getItem(`${this.LS_BACKUP_KEY}_${userId}`);
      return backup ? JSON.parse(backup) : [];
    } catch (error) {
      console.error('Error retrieving gear list:', error);
      return [];
    }
  }

  private async queueSync(action: 'create' | 'update' | 'delete', data: any) {
    if (!this.db) return;

    try {
      await this.db.add(this.SYNC_STORE, {
        action,
        data,
        timestamp: Date.now(),
      });
      await this.processSyncQueue();
    } catch (error) {
      console.error('Error queueing sync operation:', error);
    }
  }

  private async processSyncQueue() {
    if (!this.db) return;

    try {
      const tx = this.db.transaction(this.SYNC_STORE, 'readwrite');
      const store = tx.objectStore(this.SYNC_STORE);
      const items = await store.getAll();

      for (const item of items) {
        try {
          await this.syncWithRedis(item.value);
          await store.delete(item.key);
        } catch (error) {
          console.error('Failed to sync item:', error);
          // Leave failed items in queue for retry
          if (item.value.retryCount >= 3) {
            await store.delete(item.key);
          }
        }
      }
    } catch (error) {
      console.error('Error processing sync queue:', error);
    }
  }

  private async syncWithRedis(syncItem: { action: string; data: any }) {
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