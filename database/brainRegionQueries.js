
import { getDatabase } from './database';

// Convert database values back into the format used by the app.
function formatBrainRegion(row) {
  if (!row) return null;

  return {
    ...row,
    functions: row.functions ? row.functions.split('\n') : [],
    additional_sources: row.additional_sources
      ? JSON.parse(row.additional_sources)
      : [],
  };
}

// Get all brain regions.
export async function getAllBrainRegions() {
  const db = await getDatabase();

  const rows = await db.getAllAsync(
    'SELECT * FROM brain_regions ORDER BY id ASC'
  );

  return rows.map(formatBrainRegion);
}

// Get one brain region using its ID.
export async function getBrainRegionById(id) {
  const db = await getDatabase();

  const row = await db.getFirstAsync(
    'SELECT * FROM brain_regions WHERE id = ?',
    id
  );

  return formatBrainRegion(row);
}
