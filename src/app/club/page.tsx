import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ClubPageContent from '@/components/ClubPageContent';

export const metadata: Metadata = {
  title: 'El Club — Historia, Sedes y Equipo Técnico',
  description:
    'Conoce el Club Natación Artística Atlantis: nuestra historia, sedes en Nazaret, Nou Moles y Benimamet, y nuestro equipo técnico en Valencia.',
  alternates: {
    canonical: '/club',
  },
  openGraph: {
    title: 'El Club — CNA Atlantis',
    description:
      'Historia, sedes y equipo técnico del Club Natación Artística Atlantis en Valencia.',
    url: '/club',
  },
};

export type TeamMemberData = {
  id: string;
  name: string;
  role: string;
  description: string;
  image_url: string | null;
};

export default async function ClubPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('site_content')
    .select('value_es')
    .eq('key', 'team_members')
    .single();

  let teamMembers: TeamMemberData[] = [];
  if (data?.value_es) {
    try {
      teamMembers = JSON.parse(data.value_es);
    } catch {
      teamMembers = [];
    }
  }

  return <ClubPageContent teamMembers={teamMembers} />;
}
