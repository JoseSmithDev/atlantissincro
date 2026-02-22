import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ReservationForm from '@/components/ReservationForm';

export const metadata: Metadata = {
  title: 'Reserva tu Prueba Gratuita',
  description:
    'Reserva una clase de prueba gratuita de natación artística para tu hija en el Club Natación Artística Atlantis, Valencia. Sin compromiso.',
  alternates: {
    canonical: '/reservas',
  },
  openGraph: {
    title: 'Reserva tu Prueba Gratuita — CNA Atlantis',
    description:
      'Ven a probar una clase gratis de natación artística. Sin compromiso.',
    url: '/reservas',
  },
};

export default function ReservasPage() {
  return (
    <>
      <PageHero
        title="Reserva tu Prueba"
        subtitle="Ven a probar una clase gratis de natación artística. Sin compromiso. Solo trae tu gorro, tus ganas y tu mejor sonrisa."
      />

      <section className="py-16 bg-atlantis-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReservationForm />
        </div>
      </section>
    </>
  );
}
