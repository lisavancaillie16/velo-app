'use client';

import LocationCard from '@/components/LocationCard/LocationCard';

export default function Components({ number, title, subtitle }) {
  return (
    <div>
      <h1>Components</h1>
      <LocationCard number="2" title="Test" subtitle="Substile" />
      <LocationCard number="3" title="Test" subtitle="Substile" />
    </div>
  );
}
