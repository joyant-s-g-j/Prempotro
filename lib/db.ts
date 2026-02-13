export class LocalDB {
    private dbName = 'valentine_db';
    private storeName = 'valentine_store';
    private version = 1;

    private async getDB(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version)

            request.onerror = () => reject(request.error);

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, {
                        keyPath: 'id'
                    })
                }
            }

            request.onsuccess = () => {
                resolve(request.result);
            }
        })
    }

    async save(id: string, data: any): Promise<void> {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName)
            const request = store.put({ id, ...data})

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        })
    }

    async get(id: string): Promise<any> {
        const db = await this.getDB()

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName)
            const request = store.get(id)

            request.onsuccess = () => {
                resolve(request.result ? request.result : null)
            }

            request.onerror = () => reject(request.error)
        })
    }
}

export const localDB = new LocalDB()