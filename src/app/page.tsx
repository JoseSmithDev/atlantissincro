import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import CompetitionsSection from '@/components/CompetitionsSection';
import ScheduleSection from '@/components/ScheduleSection';
import NewsSection from '@/components/NewsSection';
import CTASection from '@/components/CTASection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <CompetitionsSection />
      <ScheduleSection />
      <NewsSection />
      <CTASection />
    </>
  );
}
