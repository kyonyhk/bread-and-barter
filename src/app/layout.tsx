// app/layout.tsx

import {
  FontStyleDeclaration,
  FontsPreloadLinks,
} from '@repo/components/atoms/fonts/fonts';
import ClientLayout from '@repo/components/layouts/ClientLayout';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import { css } from '../../styled-system/css';
import { AuthProvider } from './auth/AuthContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bread & Barter',
  description: 'Adopt the learning lifestyle',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <FontsPreloadLinks />
      </head>
      <body
        className={css({
          bg: 'black',
          display: 'flex',
          flexDirection: 'column',
          minH: '100vh',
        })}
      >
        <FontStyleDeclaration />
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
