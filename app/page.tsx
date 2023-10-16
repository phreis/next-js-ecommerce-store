import Link from 'next/link';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Life Essentials</h1>
      <p>
        A minimalist shopping experience to simplify your life in an
        overwhelming world.
      </p>
      <Link className={styles.shopNow} href="/products">
        Start shopping{' '}
      </Link>
    </main>
  );
}
