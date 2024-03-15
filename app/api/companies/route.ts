import { NextResponse } from 'next/server';
import { getCompanies } from '@/db/db';

export async function GET() {
  const companies = await getCompanies();

  return NextResponse.json({ companies });
}
