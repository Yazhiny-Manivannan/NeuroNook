
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

// Create database tables and insert the initial brain-region data.
export async function initializeDatabase() {
  const db = await getDatabase();

  // Store brain-region information.
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

  // Store bookmarked brain regions.
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS saved_topics (
      region_id INTEGER PRIMARY KEY NOT NULL,
      saved_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (region_id) REFERENCES brain_regions(id)
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
