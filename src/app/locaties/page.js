'use client';

import styles from './page.module.css';
import useNetwork from '@/data/network';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import LocationCard from '@/components/LocationCard/LocationCard';

export default function About() {
  const { network, isLoading, isError } = useNetwork();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className={styles.pageContainer}>
      <div>
        <img className={styles.logo} src="/logovelo.png" alt="logo" />
      </div>

      <div className={styles.swiper}>
        <Swiper spaceBetween={50} slidesPerView={1}>
          {/* Slide 1 - Mas */}
          <SwiperSlide>
            <div className={styles.slideContent}>
              <div className={styles.textBlock}>
                <p className={styles.locationTitle}>Mas</p>
                <p className={styles.address}>Godefriduskaai</p>
              </div>

              <div className={styles.imageBlock}>
                <img className={styles.pin} src="/pin.svg" alt="pin" />
                <img className={styles.image} src="/mas.png" alt="Mas" />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 - AP Ellermanstraat */}
          <SwiperSlide>
            <div className={styles.slideContent}>
              <p className={styles.locationTitle}>AP Ellermanstraat</p>
              <p className={styles.address}>Ellermanstraat</p>
              <img className={styles.pin} src="/pin.svg" alt="pin" />
              <img
                className={styles.image}
                src="/ellerman.png"
                alt="AP Ellermanstraat"
              />
            </div>
          </SwiperSlide>

          {/* Slide 3 - Centraal Station */}
          <SwiperSlide>
            <div className={styles.slideContent}>
              <p className={styles.locationTitle}>Centraal Station</p>
              <p className={styles.address}>Lange Kievitstraat</p>
              <img className={styles.pin} src="/pin.svg" alt="pin" />
              <img
                className={styles.image}
                src="/centraal.png"
                alt="Centraal Station"
              />
            </div>
          </SwiperSlide>

          {/* Swiper arrow */}
          <img className={styles.arrow} src="/pijltje.svg" alt="arrow" />
        </Swiper>
      </div>

      {/* Wavy grass image right above card */}
      <div className={styles.grasWrapper}>
        <img className={styles.gras} src="/gras.png" alt="gras" />
      </div>

      <div className={styles.card}>
        <div className={styles.insertcard}>
          <h2 className={styles.h2}>Kies jouw station</h2>
          <div className={styles.toggleView}>
            <Link href="/locaties">
              <img src="/slider.svg" alt="grid" style={{ cursor: 'pointer' }} />
            </Link>
            <Link href="/stations">
              <img src="/list.svg" alt="list" style={{ cursor: 'pointer' }} />
            </Link>
          </div>
          <h3 className={styles.h3}>Dichtsbijzijnde locaties</h3>
          <LocationCard
            number="2"
            title="Antwerpen Centraal"
            subtitle="Lange Kievitstraat"
          />
          <LocationCard
            number="3"
            title="Mas"
            subtitle="Godefriduskaai - Oostendekaai"
          />
          <LocationCard
            number="3"
            title="AP Ellermanstraat"
            subtitle="Ellermanstraat"
          />
        </div>
      </div>
    </div>
  );
}
