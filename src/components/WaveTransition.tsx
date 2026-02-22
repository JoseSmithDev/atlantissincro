type WaveTransitionProps = {
  position: 'top' | 'bottom';
  fillColor?: string;
  className?: string;
};

const WAVE_PATHS = {
  top: 'M0 0H1440V30C1344 10 1248 50 1152 40C1056 30 960 10 864 20C768 30 672 50 576 40C480 30 384 10 288 20C192 30 96 50 48 40L0 30V0Z',
  bottom: 'M0 40L48 35C96 30 192 20 288 25C384 30 480 50 576 55C672 60 768 50 864 40C960 30 1056 20 1152 25C1248 30 1344 50 1392 60L1440 65V80H0V40Z',
};

export default function WaveTransition({
  position,
  fillColor = 'white',
  className = '',
}: WaveTransitionProps) {
  const positionClass = position === 'top'
    ? 'absolute top-0 left-0 right-0'
    : 'absolute bottom-0 left-0 right-0';

  return (
    <div className={`${positionClass} ${className}`}>
      <svg
        viewBox={position === 'top' ? '0 0 1440 60' : '0 0 1440 80'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        preserveAspectRatio="none"
      >
        <path d={WAVE_PATHS[position]} fill={fillColor} />
      </svg>
    </div>
  );
}
