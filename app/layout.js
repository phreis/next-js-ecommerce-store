import './globals.css';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Header from './Header';
import Loading from './Loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Next.js Ecommerce store | phreis',
    template: '%s | phreis',
  },
  description: 'An experimental Ecommerce store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
