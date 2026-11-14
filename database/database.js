
import * as SQLite from 'expo-sqlite';
import brainRegions from '../data/brainRegions.json';

// Keep one database connection for the application.
let dbPromise = null;

export async function getDatabase() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync('neuronook.db');
  }

  return dbPromise;
}

// Create the brain_regions table and insert the initial dataset.
export async function initializeDatabase() {
  const db = await getDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS brain_regions (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL UNIQUE,
      short_description TEXT NOT NULL,
      description TEXT NOT NULL,
      functions TEXT NOT NULL,
      location TEXT NOT NULL,
      source_name TEXT NOT NULL,
      source_url TEXT NOT NULL,
      additional_sources TEXT NOT NULL DEFAULT '[]'
    );
  `);

  // Insert the initial brain-region records.
  await db.withTransactionAsync(async () => {
    for (const region of brainRegions) {
      await db.runAsync(
        `INSERT OR IGNORE INTO brain_regions (
          id,
          name,
          short_description,
          description,
          functions,
          location,
          source_name,
          source_url,
          additional_sources
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        region.id,
        region.name,
        region.short_description,
        region.description,
        region.functions.join('\n'),
        region.location,
        region.source_name,
        region.source_url,
        JSON.stringify(region.additional_sources ?? [])
      );
    }
  });

  return db;
}
