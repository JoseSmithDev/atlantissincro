import Hero from '@/components/Hero';
import SwimmerIntro from '@/components/SwimmerIntro';
import TeamPhotoSection from '@/components/TeamPhotoSection';
import AboutSection from '@/components/AboutSection';
import PalmaresSection from '@/components/PalmaresSection';
import NewsSection from '@/components/NewsSection';
import SponsorsSection from '@/components/SponsorsSection';

export default function HomePage() {
  return (
    <>
      <SwimmerIntro />
      <Hero />
      <TeamPhotoSection />
      <AboutSection />
      <PalmaresSection />
      <NewsSection />
      <SponsorsSection />
    </>
  );
}
