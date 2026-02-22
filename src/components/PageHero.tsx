import WaveTransition from './WaveTransition';

type PageHeroProps = {
  title: string;
  subtitle?: string;
  waveFillColor?: string;
  compact?: boolean;
  children?: React.ReactNode;
};

export default function PageHero({
  title,
  subtitle,
  waveFillColor = '#F8FAFC',
  compact = false,
  children,
}: PageHeroProps) {
  return (
    <section
      className={`relative bg-gradient-to-br from-atlantis-blue via-[#001a33] to-atlantis-red/10 text-white overflow-hidden ${
        compact ? 'py-16 md:py-20' : 'py-24 md:py-32'
      }`}
    >
      {/* Subtle red radial glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_50%_50%,_#D32F2F,_transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
          {title}
        </h1>
        <div className="w-16 h-1 bg-atlantis-red mx-auto rounded-full mb-6" />
        {subtitle && (
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {children}
      </div>

      {/* Wave bottom */}
      <WaveTransition position="bottom" fillColor={waveFillColor} />
    </section>
  );
}
