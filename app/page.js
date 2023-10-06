import Image from 'next/image';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Life Essentials</h1>
      <p>
        A minimalist shopping experience to simplify your life in an
        overwhelming world.
      </p>
    </main>
  );
}
