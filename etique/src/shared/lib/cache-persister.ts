import type { PersistedClient, Persister } from '@tanstack/react-query-persist-client';
import SQLiteKV from 'expo-sqlite/kv-store';

/**
 * Creates a persister for React Query using Expo's SQLite Key-Value Store
 */
const cachePersister = (): Persister => {
  // KV Store namespace for cache data
  const STORE_NAME = 'reactQueryCache';

  return {
    persistClient: async (persistClient) => {
      try {
        // Get all queries from the cache
        const cache = persistClient.clientState;

        // Store the entire cache as a single value
        await SQLiteKV.setItemAsync(STORE_NAME, JSON.stringify(cache));
      } catch (error) {
        console.log('Error persisting query cache:', error);
        throw error;
      }
    },

    restoreClient: async () => {
      try {
        // Retrieve the cache object
        const cachedQueriesJson = await SQLiteKV.getItemAsync(STORE_NAME);

        if (!cachedQueriesJson) {
          console.log('No cache found in SQLiteKV');
          return undefined;
        }

        const cachedQueries = JSON.parse(cachedQueriesJson as string);
        const restoredCache: PersistedClient = {
          timestamp: Date.now(), // or some other timestamp value
          buster: 'v1', // or some other buster value
          clientState: cachedQueries,
        };

        console.log('Restored cache from SQLiteKV');
        return restoredCache;
      } catch (error) {
        console.error('Error restoring query cache:', error);
        // Return undefined if restoration fails
        return undefined;
      }
    },

    removeClient: async () => {
      try {
        // Delete the cache item
        //  SQLiteKV.setItemAsync(STORE_NAME, '');
        await SQLiteKV.clearAsync();

        console.log('Removed cache from SQLiteKV');
      } catch (error) {
        console.error('Error removing query cache:', error);
        throw error;
      }
    },
  };
};

export default cachePersister;
