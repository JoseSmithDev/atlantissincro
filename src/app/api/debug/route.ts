import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  const result: Record<string, unknown> = {};

  if (authError) {
    result.error = 'Auth error';
    result.details = authError.message;
  } else if (!user) {
    result.error = 'No user logged in';
  } else {
    result.user = { id: user.id, email: user.email };

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    result.profile = profile;
    result.profileError = profileError?.message || null;
  }

  // Write to file for debugging
  try {
    writeFileSync(
      join(process.cwd(), 'debug-output.json'),
      JSON.stringify(result, null, 2)
    );
  } catch {}

  return NextResponse.json(result);
}
