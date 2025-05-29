'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './page.module.css';
import useNetwork from '@/data/network';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Link from 'next/link';
import LocationCard from '@/components/LocationCard/LocationCard';
import { useRouter } from 'next/navigation';

export default function About() {
  const { network, isLoading, isError } = useNetwork();
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const [stationsData, setStationsData] = useState({
    centraal: { id: null, free_bikes: 0, empty_slots: 0 },
    mas: { id: null, free_bikes: 0, empty_slots: 0 },
    ellerman: { id: null, free_bikes: 0, empty_slots: 0 },
  });

  useEffect(() => {
    if (network?.stations) {
      const getStationData = (query) =>
        network.stations.find((s) =>
          s.name.toLowerCase().includes(query.toLowerCase())
        );

      const centraal = getStationData('Centraal Station');
      const mas = getStationData('Godefriduskaai');
      const ellerman = getStationData('Ellermanstraat');

      setStationsData({
        centraal: centraal
          ? {
              id: centraal.id,
              free_bikes: centraal.free_bikes,
              empty_slots: centraal.empty_slots,
            }
          : { id: null, free_bikes: 0, empty_slots: 0 },
        mas: mas
          ? {
              id: mas.id,
              free_bikes: mas.free_bikes,
              empty_slots: mas.empty_slots,
            }
          : { id: null, free_bikes: 0, empty_slots: 0 },
        ellerman: ellerman
          ? {
              id: ellerman.id,
              free_bikes: ellerman.free_bikes,
              empty_slots: ellerman.empty_slots,
            }
          : { id: null, free_bikes: 0, empty_slots: 0 },
      });
    }
  }, [network]);

  const handleNextSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.activeIndex);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className={styles.body}>
      <div>
        <img className={styles.logo} src="/logovelo.png" alt="logo" />
      </div>

      <div className={styles.swiper}>
        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
        >
          <SwiperSlide>
            <div className={styles.slideContent}>
              <div className={styles.textBlock}>
                <p className={styles.locationTitle}>Mas</p>
                <p className={styles.address}>Godefriduskaai</p>
              </div>

              <div className={styles.imageBlock}>
                <img className={styles.pin} src="/pin.svg" alt="pin" />
                <img className={styles.masImage} src="/mas.png" alt="Mas" />
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.slideContent}>
              <p className={styles.locationTitle}>AP Ellermanstraat</p>
              <p className={styles.address}>Ellermanstraat</p>
              <img className={styles.pin} src="/pin.svg" alt="pin" />
              <img
                className={styles.ellermanImage}
                src="/ellerman.png"
                alt="AP Ellermanstraat"
              />
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className={styles.slideContent}>
              <p className={styles.locationTitle}>Centraal Station</p>
              <p className={styles.address}>Lange Kievitstraat</p>
              <img className={styles.pin} src="/pin.svg" alt="pin" />
              <img
                className={styles.centraalImage}
                src="/centraal.png"
                alt="Centraal Station"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        {currentSlide > 0 && (
          <img
            className={styles.arrowLeft}
            src="/pijltje.svg"
            alt="previous arrow"
            onClick={handlePrevSlide}
          />
        )}

        {currentSlide < 2 && (
          <img
            className={styles.arrow}
            src="/pijltje.svg"
            alt="next arrow"
            onClick={handleNextSlide}
          />
        )}
      </div>

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

          {stationsData.centraal.id && (
            <Link href={`/stations/${stationsData.centraal.id}`}>
              <LocationCard
                number="1"
                title="Antwerpen Centraal"
                subtitle="Lange Kievitstraat"
                free_bike={stationsData.centraal.free_bikes}
                empty_slots={stationsData.centraal.empty_slots}
              />
            </Link>
          )}

          {stationsData.mas.id && (
            <Link href={`/stations/${stationsData.mas.id}`}>
              <LocationCard
                number="2"
                title="Mas"
                subtitle="Godefriduskaai - Oostendekaai"
                free_bike={stationsData.mas.free_bikes}
                empty_slots={stationsData.mas.empty_slots}
              />
            </Link>
          )}

          {stationsData.ellerman.id && (
            <Link href={`/stations/${stationsData.ellerman.id}`}>
              <LocationCard
                number="3"
                title="AP Ellermanstraat"
                subtitle="Ellermanstraat"
                free_bike={stationsData.ellerman.free_bikes}
                empty_slots={stationsData.ellerman.empty_slots}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
