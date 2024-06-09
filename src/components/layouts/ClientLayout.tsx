// components/layouts/ClientLayout.tsx

'use client';

import Footer from '@repo/components/molecules/footer/Footer';
import Navbar from '@repo/components/molecules/navbar/Navbar';
import ProfilePopup from '@repo/components/organisms/profile-popup/ProfilePopup';
import { ProfilePopupProvider } from '@repo/contexts/profile-popup-context';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  const isLandingPage = pathname === '/landing-page';

  return (
    <ProfilePopupProvider>
      {!isLandingPage && <Navbar />}
      <ProfilePopup name="John Goh" />
      {children}
      {!isLandingPage && <Footer />}
    </ProfilePopupProvider>
  );
}
