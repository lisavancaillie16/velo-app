'use client';

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import useNetwork from '@/data/network';
import { getDistance } from '@/helpers/get-distance';
import Link from 'next/link';
import LocationCard from '@/components/LocationCard/LocationCard';

export default function Home() {
  const [filter, setFilter] = useState('');
  const [location, setLocation] = useState({});
  const { network, isLoading, isError } = useNetwork();

  // use effect gebruiken om bv iets op te roepen enkel bij opstart van de app
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const stations = network.stations.filter(
    (station) => station.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
  );

  // map stations to add disrance to current location
  stations.map((station) => {
    station.distance =
      getDistance(
        location.latitude,
        location.longitude,
        station.latitude,
        station.longitude
      ).distance / 1000;
  });

  // sort stations by distance
  stations.sort((a, b) => a.distance - b.distance);

  function handleFilterChange(e) {
    setFilter(e.target.value);
  }

  return (
    <div className={styles.body}>
      <img className={styles.logo} src="/logovelo.png" alt="logo" />
      <h1 className={styles.title}>Kies jouw station</h1>
      <div className={styles.inputWrapper}>
        <img
          src="/search.png"
          alt="Search Icon"
          className={styles.searchIcon}
        />
        <input
          type="text"
          placeholder="Zoek een station"
          value={filter}
          onChange={handleFilterChange}
          className={styles.filterInput}
        />
      </div>

      <div className={styles.toggleView}>
        <Link href="/locaties">
          <img src="/slider.svg" alt="grid" style={{ cursor: 'pointer' }} />
        </Link>
        <Link href="/stations">
          <img src="/list.svg" alt="list" style={{ cursor: 'pointer' }} />
        </Link>
      </div>
      {stations.map((station) => (
        <div key={station.id}>
          <Link href={`/stations/${station.id}`}>
            <LocationCard
              title={station.name || 'Unknown Station'} // Fallback for missing name
              subtitle={station.extra?.address || 'Address not available'} // Fallback for missing address
              free_bike={station.free_bikes || 0} // Fallback for missing free bikes
              empty_slots={station.empty_slots || 0} // Fallback for missing empty slots
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
