'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TeachPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/teach/1');
  }, [router]);

  return null;
}
