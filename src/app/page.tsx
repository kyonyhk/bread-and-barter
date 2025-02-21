'use client';

import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import Link from 'next/link';
import { css } from '../../styled-system/css';

interface Course {
  id: string;
  name: string;
  description: string;
  course_number: number;
  price: number;
  duration: string;
  image_url: string;
}

interface Program {
  id: string;
  name: string;
  description: string;
  status: string;
  courses: Course[];
}

interface Teacher {
  id: string;
  first_name: string;
  last_name: string;
  description: string;
  interests: string[];
  is_teacher: boolean;
  programs: Program[];
}

export default function LandingPage() {
  return (
    <div
      className={css({
        w: '100vw',
        h: '100vh',
        bg: 'black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '32px',
      })}
    >
      <div
        className={css({
          textStyle: 'heading1',
          color: 'yellow100',
          textAlign: 'center',
        })}
      >
        Welcome to Bread & Barter
      </div>
      <div
        className={css({
          textStyle: 'paragraph1',
          color: 'yellow50',
          textAlign: 'center',
          maxW: '600px',
        })}
      >
        Your platform for discovering and learning new skills through bartering.
      </div>
      <Link href="/home">
        <ButtonLarge>Explore Courses</ButtonLarge>
      </Link>
    </div>
  );
}
