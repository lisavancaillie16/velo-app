'use client';

import styles from './page.module.css';
import useNetwork from '@/data/network';

export default function About() {
  const { network, isLoading, isError } = useNetwork();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <div>
        <img className={styles.logo} src="/logovelo.png" alt="logo" />
      </div>
      <h1 className={styles.title}>Let's take a ride</h1>
      <img className={styles.homebike} src="/homebike.png" alt="logo" />
      <div className={styles.buttons}>
        <a href="/locaties">
          <button className={styles.button}>Vind jouw Velo</button>
        </a>
        <a href="/beschikbaarheid">
          <button className={styles.button}>Beschikbaarheid</button>
        </a>
      </div>
    </div>
  );
}
