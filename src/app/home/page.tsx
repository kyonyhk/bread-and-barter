'use client';

import HomeAccordion from '@repo/components/molecules/home-accordion/HomeAccordion';
import PhotoBlock from '@repo/components/molecules/photo-block/PhotoBlock';
import VideoBlock from '@repo/components/molecules/video-block/VideoBlock';
import { useEffect, useState } from 'react';
import { css } from '../../../styled-system/css';
import { useAuth } from '../auth/AuthContext';

interface Course {
  id: string;
  name: string;
  description: string;
  course_number: number;
  price: number;
  duration: string;
  course_details: string;
  max_students: number;
  is_group_session: boolean;
  location: string;
}

interface Program {
  id: string;
  name: string;
  description: string;
  status: string;
  teacher: {
    id: string;
    raw_user_meta_data: {
      first_name: string;
      last_name: string;
    };
  };
  courses: Course[];
}

export default function HomePage() {
  const { user } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        console.log('[Home] Starting to fetch programs...');
        const response = await fetch('/api/programs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('[Home] Programs data received:', data);
        setPrograms(data);
        setError(null);
      } catch (error) {
        console.error('[Home] Error fetching programs:', error);
        setError('Failed to load programs. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  const renderGrid = (startIndex: number) => {
    // Only show programs that have at least one course
    const activePrograms = programs.filter(
      (program) => program.courses.length > 0
    );
    const gridPrograms = activePrograms.slice(startIndex, startIndex + 5);
    if (gridPrograms.length === 0) return null;

    return (
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        })}
      >
        {/* First Column - 2 PhotoBlocks */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
        >
          {[0, 1].map((i) => {
            const program = gridPrograms[i];
            return program ? (
              <PhotoBlock
                key={program.id}
                title={program.name}
                subtitle={`${program.teacher.raw_user_meta_data.first_name} ${program.teacher.raw_user_meta_data.last_name}`}
                programId={program.id}
                imageUrl="/images/default-program.jpg"
              />
            ) : null;
          })}
        </div>

        {/* Second Column - 2 PhotoBlocks */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
        >
          {[2, 3].map((i) => {
            const program = gridPrograms[i];
            return program ? (
              <PhotoBlock
                key={program.id}
                title={program.name}
                subtitle={`${program.teacher.raw_user_meta_data.first_name} ${program.teacher.raw_user_meta_data.last_name}`}
                programId={program.id}
                imageUrl="/images/default-program.jpg"
              />
            ) : null;
          })}
        </div>

        {/* Third Column - 1 VideoBlock */}
        {gridPrograms[4] && (
          <VideoBlock
            key={gridPrograms[4].id}
            title={gridPrograms[4].name}
            subtitle={`${gridPrograms[4].teacher.raw_user_meta_data.first_name} ${gridPrograms[4].teacher.raw_user_meta_data.last_name}`}
            programId={gridPrograms[4].id}
            imageUrl="/images/default-program.jpg"
          />
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-yellow5 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {user ? (
            <>
              <h1 className="text-4xl font-bold text-yellow100">
                Welcome, {user.user_metadata.first_name}!
              </h1>
              <p className="mt-3 text-xl text-yellow50">
                Start exploring courses or create your own
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-yellow100">
                Welcome to Bread & Barter
              </h1>
              <p className="mt-3 text-xl text-yellow50">
                Discover and learn from expert teachers in our community
              </p>
            </>
          )}
        </div>
        {/* Rest of your home page content */}
        <div
          className={css({
            w: '100vw',
            h: '100%',
            bg: 'black',
            display: 'flex',
            flexDirection: 'column',
            gap: '80px',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '160px 0px 160px 0px',
          })}
        >
          {/* Grid Section */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              w: '100vw',
              maxW: '1080px',
              h: '100%',
              padding: '0px 40px',
            })}
          >
            {/* Heading */}
            <div
              className={css({
                textStyle: 'heading3',
                color: 'yellow100',
                w: '100%',
              })}
            >
              What are you looking to learn today?
            </div>

            {/* Grid Wrapper */}
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              })}
            >
              {isLoading ? (
                <div
                  className={css({ color: 'yellow50', textAlign: 'center' })}
                >
                  Loading programs...
                </div>
              ) : error ? (
                <div className={css({ color: 'red.500', textAlign: 'center' })}>
                  {error}
                </div>
              ) : (
                <>
                  {/* First set of 5 tiles */}
                  {renderGrid(0)}
                  {/* Second set of 5 tiles */}
                  {renderGrid(5)}
                </>
              )}
            </div>
          </div>

          {/* Q&A Section */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              w: '100vw',
              maxW: '1080px',
              h: '100%',
              padding: '0px 40px 80px 40px',
            })}
          >
            {/* Heading */}
            <div
              className={css({
                textStyle: 'heading3',
                color: 'yellow100',
                w: '100%',
              })}
            >
              Answering your questions.
            </div>
            <HomeAccordion title="Question 01">
              Some Q&A answers here.
            </HomeAccordion>
            <HomeAccordion title="Question 02">
              Some Q&A answers here.
            </HomeAccordion>
            <HomeAccordion title="Question 03">
              Some Q&A answers here.
            </HomeAccordion>
          </div>
        </div>
      </div>
    </div>
  );
}
