import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Club Natación Artística Atlantis — Valencia';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #003366 0%, #001a33 50%, #003366 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle red glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 60%, rgba(211,47,47,0.15), transparent 70%)',
          }}
        />

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: -4,
              color: 'white',
              lineHeight: 1,
            }}
          >
            ATLANTIS
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: 12,
              color: '#D32F2F',
              lineHeight: 1,
              marginTop: 16,
              textTransform: 'uppercase',
            }}
          >
            NATACIÓN ARTÍSTICA
          </div>

          {/* Red divider */}
          <div
            style={{
              width: 96,
              height: 4,
              background: '#D32F2F',
              borderRadius: 2,
              marginTop: 32,
              marginBottom: 32,
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: 28,
              color: '#94a3b8',
              fontWeight: 500,
            }}
          >
            Club de Natación Artística — Valencia
          </div>
        </div>

        {/* Wave decoration at bottom */}
        <svg
          viewBox="0 0 1200 80"
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
          }}
        >
          <path
            d="M0 40L50 35C100 30 200 20 300 25C400 30 500 50 600 55C700 60 800 50 900 40C1000 30 1100 25 1150 22L1200 20V80H0V40Z"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
