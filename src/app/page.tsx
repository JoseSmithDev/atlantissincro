import Hero from '@/components/Hero';
import SwimmerIntro from '@/components/SwimmerIntro';
import TeamPhotoSection from '@/components/TeamPhotoSection';
import AboutSection from '@/components/AboutSection';
import CompetitionsSection from '@/components/CompetitionsSection';
import NewsSection from '@/components/NewsSection';
export default function HomePage() {
  return (
    <>
      <SwimmerIntro />
      <Hero />
      <TeamPhotoSection />
      <AboutSection />
      <CompetitionsSection />
      <NewsSection />
    </>
  );
}
