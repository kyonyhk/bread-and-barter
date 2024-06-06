import {
  FontStyleDeclaration,
  FontsPreloadLinks,
} from '@repo/components/atoms/fonts/fonts';
import type { Metadata } from 'next';
import { css } from 'styled-system/css';

import './globals.css';

export const metadata: Metadata = {
  title: 'Bread & Barter',
  description: 'Adopt the learning lifestyle',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <FontsPreloadLinks />
      </head>
      <body className={css({ bg: 'black' })}>
        <FontStyleDeclaration />
        {children}
      </body>
    </html>
  );
}
