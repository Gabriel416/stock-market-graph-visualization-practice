import { NextResponse } from 'next/server';
import { getCompany } from '@/db/db';

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  const [company] = await getCompany(slug);

  return NextResponse.json({ company });
}
