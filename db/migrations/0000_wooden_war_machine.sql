CREATE TABLE IF NOT EXISTS "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"ticker" text NOT NULL,
	"name" text NOT NULL,
	"sector" text NOT NULL,
	"headquarters" text NOT NULL,
	"date_added" text NOT NULL,
	CONSTRAINT "companies_ticker_unique" UNIQUE("ticker"),
	CONSTRAINT "companies_name_unique" UNIQUE("name")
);
