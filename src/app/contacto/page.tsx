import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto — Club Natación Artística Atlantis',
  description:
    'Contacta con el Club Natación Artística Atlantis. Resuelve tus dudas sobre categorías, horarios e inscripciones.',
  alternates: {
    canonical: '/contacto',
  },
};

export default function ContactoPage() {
  return (
    <>
      <PageHero
        title="Contacto"
        subtitle="¿Tienes alguna pregunta? Escríbenos y te responderemos lo antes posible."
      />

      <section className="py-16 bg-atlantis-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
