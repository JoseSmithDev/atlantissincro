import type { Metadata } from 'next';
import LoginPageContent from '@/components/LoginPageContent';

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description:
    'Accede a tu cuenta del Club Natación Artística Atlantis para ver fotos de competiciones y eventos.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/login',
  },
};

export default function LoginPage() {
  return <LoginPageContent />;
}
