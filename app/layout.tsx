import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './index.css';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'fhEVM Next App',
  description: 'Template for using fhevmjs in NextJS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>lol</title>
        <Script src="https://cdn.zama.ai/fhevmjs/0.6.2/fhevmjs.umd.cjs" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
