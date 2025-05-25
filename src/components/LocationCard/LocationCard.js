'use client';

import styles from './LocationCard.module.css';

export default function LocationCard({
  number,
  title,
  subtitle,
  free_bike,
  empty_slots,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardLeft}>
        <div>
          <div className={styles.title}>{title}</div>
          <div className={styles.subtitle}>{subtitle}</div>
          <div className={styles.bikeInfo}>
            <div className={styles.free_bikes}>
              <img
                src="/pedal_bike.svg"
                alt="Bike icon"
                className={styles.bikeIcon}
              />
              {free_bike}
            </div>
            <div className={styles.empty_slots}>
              <img
                src="/slots.svg"
                alt="Slots icon"
                className={styles.slotsIcon}
              />
              {empty_slots}
            </div>
          </div>
        </div>
      </div>
      <img src="/pijltje.svg" alt="Pijl icoon" className={styles.arrow} />
    </div>
  );
}
