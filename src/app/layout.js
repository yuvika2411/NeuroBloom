import { Nunito, DM_Sans, Sora } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800']
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '700']
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['400', '600', '700']
});

import SmoothScroll from '../components/SmoothScroll';

export const metadata = {
  title: 'SynaptiX | Where Every Child\'s Mind Reaches for the Stars',
  description: 'Science-backed, gamified cognitive & sensory development platform for neurodiverse children.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${dmSans.variable} ${sora.variable} font-sans antialiased bg-[#F4F6FC]`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
