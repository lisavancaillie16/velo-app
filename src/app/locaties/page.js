'use client';

import styles from './page.module.css';
import useNetwork from '@/data/network';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import LocationCard from '@/components/LocationCard/LocationCard';

export default function About() {
  const { network, isLoading, isError } = useNetwork();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <div>
        <img className={styles.logo} src="/logovelo.png" alt="logo" />
      </div>

      <div className={styles.swiper}>
        <Swiper spaceBetween={50} slidesPerView={1}>
          {[1, 2, 3].map((_, i) => (
            <SwiperSlide key={i}>
              <div className={styles.slideContent}>
                <p className={styles.locationTitle}>Mas</p>
                <p className={styles.address}>Godefriduskaai</p>
                <img className={styles.pin} src="/pin.svg" alt="pin" />
                <img className={styles.image} src="/mas.png" alt="Mas" />
              </div>
            </SwiperSlide>
          ))}
          <img className={styles.arrow} src="/pijltje.svg" alt="arrow" />
        </Swiper>
      </div>
      <div className={styles.card}>
        <div className={styles.insertcard}>
          <h2 className={styles.h2}>Vind jouw locatie</h2>
          <h3 className={styles.h3}>Dichtsbijzijnde locaties</h3>
          <LocationCard number="2" title="Test" subtitle="Substile" />
          <LocationCard number="3" title="Test" subtitle="Substile" />
        </div>
      </div>
    </div>
  );
}
