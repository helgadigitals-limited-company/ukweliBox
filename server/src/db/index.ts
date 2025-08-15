import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import env from '@/env.js'
import * as schema from '@/db/schema.js'


export const pool = new Pool({
	connectionString: env.DATABASE_URL,
	max: 10,
	idleTimeoutMillis: 30000,
})

const db = drizzle(pool, {
	schema, casing: 'snake_case'
})

export default db
