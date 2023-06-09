class IndexedDB {
  db;

  /**
   * 생성자
   * @param {string} dbName
   * @param {number} dbVersion
   * @param {string[]} stores
   */
  constructor(dbName, dbVersion, stores) {
    this.dbName = dbName;
    this.dbVersion = dbVersion;
    this.stores = stores;
  }

  /**
   * DB 오픈 메서드
   * @returns {Promise<void>}
   */
  async openDB() {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, this.dbVersion);

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = (e) => {
        reject(e);
      };

      request.onupgradeneeded = () => {
        this.db = request.result;

        this.stores.forEach((store) => {
          if (this.db.objectStoreNames.contains(store)) {
            this.db.deleteObjectStore(store);
          }
          this.db.createObjectStore(store, { keyPath: 'id' });
        });
      };
    });
  }

  /**
   * 데이터 조회 메서드
   * @param {string} storeName
   * @param {number} id
   * @returns {Promise<object>}
   */
  async getData(storeName, id) {
    return new Promise((resolve, reject) => {
      const request = this.db.transaction(storeName, 'readonly').objectStore(storeName).get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (e) => {
        reject(e);
      };
    });
  }

  /**
   * 데이터 전체 조회 메서드
   * @param {string} storeName
   * @returns {Promise<object[]>}
   */
  async getAllData(storeName) {
    return new Promise((resolve, reject) => {
      const request = this.db.transaction(storeName, 'readonly').objectStore(storeName).getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (e) => {
        reject(e);
      };
    });
  }

  /**
   * 데이터 추가 메서드
   * @param {string} storeName
   * @param {object} data
   * @returns {Promise<object>}
   */
  async upsertData(storeName, data) {
    return new Promise((resolve, reject) => {
      const objectStore = this.db.transaction(storeName, 'readwrite').objectStore(storeName);
      const modifiedData = { ...data, id: data.id || new Date().getTime() };
      const request = objectStore.put(modifiedData);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.log(request.error);
        reject(request.error);
      };
    });
  }

  /**
   * 데이터 삭제 메서드
   * @param {string} storeName
   * @param {number} id
   * @returns {Promise<object>}
   */
  async deleteData(storeName, id) {
    return new Promise((resolve, reject) => {
      const request = this.db.transaction(storeName, 'readwrite').objectStore(storeName).delete(id);

      request.onsuccess = () => {
        resolve(true);
      };

      request.onerror = (e) => {
        reject(e);
      };
    });
  }
}

const sandboxDB = new IndexedDB('sandboxDB', 2, ['notepad']);

export default sandboxDB;
