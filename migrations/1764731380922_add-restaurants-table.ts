/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  // Ensure PostGIS extension is enabled
  pgm.createExtension('postgis', { ifNotExists: true });

  pgm.createTable('restaurants', {
    id: 'id',
    google_place_id: { type: 'text', notNull: false, unique: true }, // Made nullable
    overture_id: { type: 'text', notNull: false, unique: true }, // Added overture_id
    address: { type: 'text', notNull: true }, // Added address
    // Using public.geography(Point, 4326) to ensure it finds the type in public schema
    geolocation: { type: 'public.geography(Point, 4326)', notNull: true },
    name: { type: 'text', notNull: true }, // Added name as it's essential
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });

  // Create GIST index for efficient geospatial queries
  pgm.createIndex('restaurants', 'geolocation', { method: 'gist' });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('restaurants');
  // We generally don't drop the extension in down migrations as other tables might rely on it
}
