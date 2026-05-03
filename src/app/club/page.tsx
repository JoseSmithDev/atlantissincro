import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import ClubPageContent from '@/components/ClubPageContent';

export const metadata: Metadata = {
  title: 'El Club — Historia, Programas y Equipo Técnico',
  description:
    'Conoce el Club Natación Artística Atlantis: nuestra historia, programas de iniciación, competición y máster, horarios de entrenamiento y equipo técnico en Valencia.',
  alternates: {
    canonical: '/club',
  },
  openGraph: {
    title: 'El Club — CNA Atlantis',
    description:
      'Historia, programas y equipo técnico del Club Natación Artística Atlantis en Valencia.',
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
