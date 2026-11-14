import { getDatabase } from './database';

export async function saveTopic(regionId) {
  const db = await getDatabase();

  await db.runAsync(
    'INSERT OR IGNORE INTO saved_topics (region_id) VALUES (?)',
    regionId
  );
}

export async function getSavedTopics() {
  const db = await getDatabase();

  const rows = await db.getAllAsync(`
    SELECT brain_regions.*
    FROM brain_regions
    INNER JOIN saved_topics
      ON brain_regions.id = saved_topics.region_id
    ORDER BY saved_topics.saved_at DESC
  `);

  return rows.map((row) => ({
    ...row,
    functions: row.functions ? row.functions.split('\n') : [],
    additional_sources: row.additional_sources
      ? JSON.parse(row.additional_sources)
      : [],
  }));
}

export async function isTopicSaved(regionId) {
  const db = await getDatabase();

  const result = await db.getFirstAsync(
    'SELECT region_id FROM saved_topics WHERE region_id = ?',
    regionId
  );

  return !!result;
}

export async function removeSavedTopic(regionId) {
  const db = await getDatabase();

  await db.runAsync(
    'DELETE FROM saved_topics WHERE region_id = ?',
    regionId
  );
}
