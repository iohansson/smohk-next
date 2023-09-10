import { type ReactNode } from 'react';
import '../styles/index.css';
import { Inter } from 'next/font/google';
import { Navbar } from '@/modules/layout/Navbar';
import { ClerkProvider } from '@clerk/nextjs';
import clsx from 'clsx';

export const metadata = {
  title: 'Smohk. Smoke without judgement.',
  description: 'Track your smoking while enjoying it.',
  viewport: 'width=device-width, initial-scale=1',
  icons: [
    {
      url: '/favicon.ico',
      sizes: 'any',
      type: 'image/x-icon',
    },
  ],
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={clsx(inter.className, 'min-h-full flex flex-col')}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
