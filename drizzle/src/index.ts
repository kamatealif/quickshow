import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

// This uses a WebSocket connection, which is stable for scripts
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);

// Note: When your script is done, you may need to close the pool to exit the process
// await pool.end();