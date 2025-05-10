'use client';

import styles from './LocationCard.module.css';

export default function LocationCard({ number, title, subtitle }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardLeft}>
        <div>
          <div className={styles.title}>{`${number} - ${title}`}</div>
          <div className={styles.subtitle}>{subtitle}</div>
        </div>
      </div>
      <img src="/pijltje.svg" alt="Pijl icoon" className={styles.arrow} />
    </div>
  );
}
