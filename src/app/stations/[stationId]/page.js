'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import useNetwork from '@/data/network';
import { useParams } from 'next/navigation';

export default function Station() {
  const { network, isLoading, isError } = useNetwork();
  const params = useParams();
  const [distance, setDistance] = useState(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const station = network.stations.find(
    (station) => station.id === params.stationId
  );

  useEffect(() => {
    if (navigator.geolocation && station) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const stationLat = station.latitude;
        const stationLon = station.longitude;

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
          const toRad = (value) => (value * Math.PI) / 180;
          const R = 6371; // Earth's radius in km
          const dLat = toRad(lat2 - lat1);
          const dLon = toRad(lon2 - lon1);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
              Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return R * c; // Distance in km
        };

        const calculatedDistance = calculateDistance(
          userLat,
          userLon,
          stationLat,
          stationLon
        );
        setDistance(calculatedDistance.toFixed(2)); // Round to 2 decimal places
      });
    }
  }, [station]);

  const fullCapacity = station.free_bikes + station.empty_slots;
  const freePercentage = ((station.free_bikes / fullCapacity) * 100).toFixed(2);

  return (
    <div className={styles.body}>
      <img className={styles.logo} src="/logovelo.png" alt="logo" />
      <h1 className={styles.title}>{station.name}</h1>
      <h2 className={styles.subtitle}>{station.extra?.address}</h2>
      <p>Free Bikes: {station.free_bikes}</p>
      <p>Empty Slots: {station.empty_slots}</p>
      <p>Full Capacity: {fullCapacity}</p>
      {distance !== null ? (
        <p>Distance from your location: {distance} km</p>
      ) : (
        <p>Calculating distance...</p>
      )}
    </div>
  );
}
