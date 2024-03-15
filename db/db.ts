import '@/db/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { eq } from 'drizzle-orm';
import * as schema from './schema';

export const db = drizzle(sql, { schema });

export const getCompanies = async () => {
  const companies = await db.query.companies.findMany();

  return companies;
};

export const getCompany = async (ticker: string) => {
  const company = await db
    .select()
    .from(schema.companies)
    .where(eq(schema.companies.ticker, ticker));

  return company;
};
