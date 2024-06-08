'use client';

import HomeAccordion from '@repo/components/molecules/home-accordion/HomeAccordion';
import PhotoBlock from '@repo/components/molecules/photo-block/PhotoBlock';
import VideoBlock from '@repo/components/molecules/video-block/VideoBlock';
import { css } from '../../styled-system/css';

// const { Root, Item, ItemTrigger, ItemIndicator, ItemContent } =
//   AccordionComponents;

export default function Home() {
  return (
    // Page Wrapper
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
          {/* Grid 1 */}
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            })}
          >
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              })}
            >
              <PhotoBlock courseName="Dry Laksa" teacherName="John Goh" />
              <PhotoBlock courseName="Dry Laksa" teacherName="John Goh" />
            </div>
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              })}
            >
              <PhotoBlock courseName="Dry Laksa" teacherName="John Goh" />
              <PhotoBlock courseName="Dry Laksa" teacherName="John Goh" />
            </div>
            <VideoBlock courseName="Dry Laksa" teacherName="John Goh" />
          </div>

          {/* Grid 2 */}
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
            })}
          >
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              })}
            >
              <PhotoBlock courseName="Dry Laksa" teacherName="John Goh" />
              <PhotoBlock courseName="Dry Laksa" teacherName="John Goh" />
            </div>
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              })}
            >
              <PhotoBlock courseName="Dry Laksa" teacherName="John Goh" />
              <PhotoBlock courseName="Dry Laksa" teacherName="John Goh" />
            </div>
            <VideoBlock courseName="Dry Laksa" teacherName="John Goh" />
          </div>
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
        <HomeAccordion title="Question 04">
          Some Q&A answers here.
        </HomeAccordion>
        <HomeAccordion title="Question 05">
          Some Q&A answers here.
        </HomeAccordion>
      </div>
    </div>
  );
}
