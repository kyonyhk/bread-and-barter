import {
  FontStyleDeclaration,
  FontsPreloadLinks,
} from '@repo/components/atoms/fonts/fonts';
import type { Metadata } from 'next';
import React from 'react';
import { css } from 'styled-system/css';

import Footer from '@repo/components/molecules/footer/Footer';
import Navbar from '@repo/components/molecules/navbar/Navbar';
import ProfilePopup from '@repo/components/organisms/profile-popup/ProfilePopup';
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
      <body
        className={css({
          bg: 'black',
          display: 'flex',
          flexDirection: 'column',
          minH: '100vh',
        })}
      >
        <FontStyleDeclaration />
        <Navbar />
        <ProfilePopup name="John Goh" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
