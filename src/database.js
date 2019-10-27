import { openDB } from 'idb';

const database = openDB('items-database', 3, {
    upgrade(db, oldVersion, newVersion, transaction) {
        db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
    },
});

export default {
    add(item) {
        return database.then(db => {
            const tx = db.transaction('items', 'readwrite');
            tx.store.add(item);
            return tx.done;
        })
       
    },

    getAll() {
        return database.then(db => {
            return db.transaction('items').objectStore('items').getAll();
        })
        
    },

    delete(item) {
        return database.then(db => {
            const tx = db.transaction('items', 'readwrite');
            tx.objectStore('items').delete(item.id);
            return tx.complete;
        });
    },

    update(item) {
        return database.then(db => {
            const tx = db.transaction('items', 'readwrite');
            tx.objectStore('items').put(item);
            return tx.complete;
        });
    },

    markAllAsUnpacked() {
        return this.getAll()
            .then(items => items.map(item => ({ ...item, packed: false })))
            .then(items => {
                return database.then(db => {
                    const tx = db.transaction('items', 'readwrite');
                    for (const item of items) {
                        tx.objectStore('items').put(item);
                    }
                    return tx.complete;
                });
            });
    },

    deleteUnpackedItems() {
        return this.getAll()
            .then(items => items.filter(item => !item.packed))
            .then(items => {
                return database.then(db => {
                    const tx = db.transaction('items', 'readwrite');
                    for (const item of items) {
                        tx.objectStore('items').delete(item.id);
                    }
                    return tx.complete;
                });
            });
    }
};
