import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to my Ecommerce store!</h1>
    </main>
  );
}
