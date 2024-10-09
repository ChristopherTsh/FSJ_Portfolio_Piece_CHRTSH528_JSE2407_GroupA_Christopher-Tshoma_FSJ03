/**
 * Caches data in local storage.
 *
 * @param {string} key - The key under which the data is stored.
 * @param {any} data - The data to be cached.
 */
export function cacheData(key, data) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
  
  /**
   * Retrieves cached data from local storage.
   *
   * @param {string} key - The key under which the data is stored.
   * @returns {any|null} The cached data or null if not found.
   */
  export function getCachedData(key) {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }
  