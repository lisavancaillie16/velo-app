'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import useNetwork from '@/data/network';

export default function About() {
  const { network, isLoading, isError } = useNetwork();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      router.push(`/stations?location=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className={styles.body}>
      <div>
        <img className={styles.logo} src="/logovelo.png" alt="logo" />
      </div>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>{"Let's take a Velo!"}</h1>
        <div className={styles.visualAndSearch}>
          <img className={styles.homebike} src="/homebike.png" alt="homebike" />
          <div className={styles.search}>
            <div className={styles.buttons}>
              <a href="/locaties">
                <button className={styles.button}>Vind jouw Velo</button>
              </a>
              <h2 className={styles.or}>or</h2>
              <div className={styles.inputWrapper}>
                <img
                  src="/search.png"
                  alt="Search Icon"
                  className={styles.searchIcon}
                />
                <input
                  type="text"
                  placeholder="Zoek een station"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className={styles.searchInput}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
