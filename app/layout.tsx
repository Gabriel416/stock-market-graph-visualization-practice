import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'S&P 500 Graph',
  description: 'Visualize and learn more about companies on the S&P 500',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1'></meta>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased bg-slate-100',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
