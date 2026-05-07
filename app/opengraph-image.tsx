import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Vector';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0f0f0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, color: '#7c6af7', letterSpacing: '-2px' }}>
          Vector
        </div>
        <div style={{ fontSize: 28, color: '#888', maxWidth: 600, textAlign: 'center' }}>
          A clean, modern space for ideas, stories, and connections.
        </div>
      </div>
    ),
    { ...size }
  );
}
