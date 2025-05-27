'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import useNetwork from '@/data/network';
import { useParams, useRouter } from 'next/navigation';

export default function Station() {
  const { network, isLoading, isError } = useNetwork();
  const params = useParams();
  const router = useRouter();
  const [distance, setDistance] = useState(null);

  const station = network?.stations.find(
    (station) => station.id === params.stationId
  );

  const handleGoBack = () => {
    router.push('/stations');
  };

  useEffect(() => {
    if (navigator.geolocation && station) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const stationLat = station.latitude;
        const stationLon = station.longitude;

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
          const toRad = (value) => (value * Math.PI) / 180;
          const R = 6371; // km
          const dLat = toRad(lat2 - lat1);
          const dLon = toRad(lon2 - lon1);
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
              Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return R * c;
        };

        const calculatedDistance = calculateDistance(
          userLat,
          userLon,
          stationLat,
          stationLon
        );
        setDistance(calculatedDistance.toFixed(2));
      });
    }
  }, [station]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const fullCapacity = station.free_bikes + station.empty_slots;

  // Create array representing all slots
  const slots = Array.from({ length: fullCapacity }, (_, index) => ({
    id: index,
    occupied: index < station.free_bikes,
  }));

  return (
    <div className={styles.container}>
      <img className={styles.logo} src="/logovelo.png" alt="logo" />

      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className={styles.backButton}
        aria-label="Go back to stations"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5M12 19L5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Terug
      </button>

      <div className={styles.body}>
        <h1 className={styles.title}>{station.name}</h1>
        <h2 className={styles.subtitle}>{station.extra?.address}</h2>
        {distance && (
          <p className={styles.distance}>
            <img src="/pin.svg" alt="pin" className={styles.icon} />
            Nog {distance} km van jouw locatie
          </p>
        )}
        <div className={styles.stats}>
          <div className={styles.card}>
            <img
              src="/pedal_bike.svg"
              alt="bike icon"
              className={styles.icon}
            />
            <p className={styles.number}>{station.free_bikes}</p>
            <p>fietsen vrij</p>
          </div>

          <div className={styles.card}>
            <img src="/slots.svg" alt="slots icon" className={styles.icon} />
            <p className={styles.number}>{station.empty_slots}</p>
            <p>lege slots</p>
          </div>
        </div>

        <div className={styles.capacity}>
          <h3 className={styles.capacityTitle}>Station Capaciteit</h3>
          <p className={styles.capacityText}>
            {station.free_bikes} van de {fullCapacity} plaatsen bezet
          </p>

          {/* Visual Slot Display */}
          <div className={styles.slotGrid}>
            {slots.map((slot) => (
              <div
                key={slot.id}
                className={`${styles.slot} ${slot.occupied ? styles.slotOccupied : styles.slotFree}`}
              >
                {slot.occupied ? (
                  <img
                    src="/pedal_bike.svg"
                    alt="bike"
                    className={styles.slotIcon}
                  />
                ) : (
                  <div className={styles.slotDot}></div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className={styles.legend}>
            <div className={styles.legendItem}>
              <div
                className={`${styles.legendColor} ${styles.legendOccupied}`}
              ></div>
              <span>Bezet</span>
            </div>
            <div className={styles.legendItem}>
              <div
                className={`${styles.legendColor} ${styles.legendFree}`}
              ></div>
              <span>Vrij</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className={styles.capacityBar}>
            <div
              className={styles.capacityFill}
              style={{
                width: `${(station.free_bikes / fullCapacity) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
