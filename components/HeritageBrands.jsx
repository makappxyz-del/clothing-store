'use client';

import { usePathname } from 'next/navigation';

const traditions = [
  { name: 'Jamdani', note: 'Woven heritage', mark: 'J' },
  { name: 'Dhakai Muslin', note: 'Fine craft', mark: 'DM' },
  { name: 'Rajshahi Silk', note: 'Silk tradition', mark: 'RS' },
  { name: 'Nakshi Kantha', note: 'Stitched stories', mark: 'NK' },
];

export default function HeritageBrands() {
  const pathname = usePathname();
  if (pathname !== '/') return null;
  return (
    <section aria-label="Bangladeshi craft traditions" style={{ background: 'var(--cream)', padding: '42px 6%', textAlign: 'center' }}>
      <p className="eyebrow">ROOTED IN BANGLADESHI CRAFT</p>
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500, margin: '8px 0 26px' }}>Traditions we celebrate</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 18, maxWidth: 1000, margin: '0 auto' }}>
        {traditions.map((item) => <div key={item.name} style={{ padding: 18, background: 'var(--paper)', border: '1px solid var(--line)' }}><span aria-hidden="true" style={{ display: 'grid', placeItems: 'center', width: 42, height: 42, margin: '0 auto 10px', border: '1px solid var(--olive)', borderRadius: '50%', color: 'var(--olive)', fontFamily: 'Playfair Display, serif' }}>{item.mark}</span><strong style={{ display: 'block' }}>{item.name}</strong><small style={{ color: 'var(--muted)' }}>{item.note}</small></div>)}
      </div>
      <p style={{ color: 'var(--muted)', fontSize: 12, margin: '18px auto 0' }}>Celebrating local textile traditions; names are cultural references, not brand endorsements.</p>
    </section>
  );
}
