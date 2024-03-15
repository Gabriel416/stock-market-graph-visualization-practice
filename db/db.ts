import '@/db/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

export const db = drizzle(sql, { schema });

export const getCompanies = async () => {
  const companies = await db.query.companies.findMany();

  return companies;
};
