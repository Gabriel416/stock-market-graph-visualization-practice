import { NextResponse, NextRequest } from 'next/server';
import { getCompanies } from '@/db/db';

export async function GET(request: NextRequest) {
  const companies = await getCompanies();

  return NextResponse.json({ companies });
}
