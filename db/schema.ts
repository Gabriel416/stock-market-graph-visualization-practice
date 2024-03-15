import { text, serial, pgTable } from 'drizzle-orm/pg-core';

export const companies = pgTable('companies', {
  id: serial('id').primaryKey(),
  ticker: text('ticker').notNull().unique(),
  name: text('name').notNull().unique(),
  sector: text('sector').notNull(),
  headquarters: text('headquarters').notNull(),
  date_added: text('date_added').notNull(),
});
