'use client';

import Download from '@repo/components/atoms/download/Download';
import CourseAccordion from '@repo/components/molecules/course-accordion/CourseAccordion';
import CourseDetails from '@repo/components/molecules/course-details/CourseDetails';
import CourseHero from '@repo/components/molecules/course-hero/CourseHero';
import CourseObjectiveTile from '@repo/components/molecules/course-objective-tile/CourseObjectiveTile';
import CourseSelectionTile from '@repo/components/molecules/course-selection-tile/CourseSelectionTile';
import TeacherProfile from '@repo/components/molecules/teacher-profile/TeacherProfile';
import { css } from 'styled-system/css';

export default function CourseComponents() {
  return (
    <div
      className={css({
        w: 'full',
        h: '100%',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        padding: '40px',
      })}
    >
      <div className={css({ textStyle: 'heading1', color: 'yellow100' })}>
        Course Page Components
      </div>
      <div
        className={css({
          w: '720px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px ',
        })}
      >
        <CourseHero
          teacherName="John Goh"
          courseName="Dry Laksa I"
          bgVideo="/images/dry-laksa.png"
          teacherProfilePic="/images/profile-pic.png"
        />
        <TeacherProfile
          name="John Goh"
          genre="Culinary"
          lessonsTaught={20}
          reviewsCount={60}
        />
      </div>
      <div
        className={css({ display: 'flex', flexDirection: 'row', gap: '8px' })}
      >
        <CourseSelectionTile
          courseNumber={1}
          courseName="Introduction to Culinary I"
          price={200}
        />
        <CourseSelectionTile
          courseNumber={2}
          courseName="Introduction to Culinary II"
          price={200}
        />
      </div>
      <div
        className={css({ display: 'flex', flexDirection: 'row', gap: '8px' })}
      >
        <CourseObjectiveTile
          objectiveNumber={1}
          objectiveText="Develop a strong foundation in pottery, including clay preparation and studio safety."
        />
        <CourseObjectiveTile
          objectiveNumber={2}
          objectiveText="Develop a strong foundation in pottery, including clay preparation and studio safety."
        />
      </div>

      {/* Course Selection */}
      <CourseAccordion title="Course Selection">
        <CourseSelectionTile
          courseNumber={1}
          courseName="Introduction to Culinary I"
          price={200}
        />
        <CourseSelectionTile
          courseNumber={2}
          courseName="Introduction to Culinary II"
          price={200}
        />
        <CourseSelectionTile
          courseNumber={3}
          courseName="Introduction to Culinary II"
          price={200}
        />
      </CourseAccordion>

      {/* Course Selection */}
      <CourseAccordion title="Course Selection">
        <CourseSelectionTile
          courseNumber={1}
          courseName="Introduction to Culinary I"
          price={200}
        />
        <CourseSelectionTile
          courseNumber={2}
          courseName="Introduction to Culinary II"
          price={200}
        />
        <CourseSelectionTile
          courseNumber={3}
          courseName="Introduction to Culinary II"
          price={200}
        />
      </CourseAccordion>

      {/* Course Details */}
      <CourseAccordion title="Course Details">
        <CourseDetails
          duration="2 hours"
          courseDetails="This comprehensive pottery course is designed for individuals of all levels, from beginners with no prior experience to intermediate and advanced potters. Our expert instructors will guide you through the fascinating world of pottery, covering everything from basic hand-building techniques to advanced wheel-throwing and glazing methods."
        />
      </CourseAccordion>

      <CourseAccordion title="Course Objectives">
        <CourseObjectiveTile
          objectiveNumber={1}
          objectiveText="Develop a strong foundation in pottery, including clay preparation and studio safety."
        />
        <CourseObjectiveTile
          objectiveNumber={2}
          objectiveText="Develop a strong foundation in pottery, including clay preparation and studio safety."
        />
        <CourseObjectiveTile
          objectiveNumber={3}
          objectiveText="Develop a strong foundation in pottery, including clay preparation and studio safety."
        />
      </CourseAccordion>

      {/* Course Requirements */}
      <CourseAccordion title="Course Requirements">
        <div className={css({ color: 'yellow50' })}>
          This comprehensive pottery course is designed for individuals of all
          levels, from beginners with no prior experience to intermediate and
          advanced potters. Our expert instructors will guide you through the
          fascinating world of pottery, covering everything from basic
          hand-building techniques to advanced wheel-throwing and glazing
          methods.
        </div>
      </CourseAccordion>

      {/* Credentials & Experience */}
      <CourseAccordion title="Credentials & Experience">
        <div className={css({ color: 'yellow50' })}>
          This comprehensive pottery course is designed for individuals of all
          levels, from beginners with no prior experience to intermediate and
          advanced potters. Our expert instructors will guide you through the
          fascinating world of pottery, covering everything from basic
          hand-building techniques to advanced wheel-throwing and glazing
          methods.
        </div>
      </CourseAccordion>

      {/* Course Materials */}
      <CourseAccordion title="Course Materials">
        <div
          className={css({
            w: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
        >
          <Download filename="Filename" />
          <Download filename="Filename" />
          <Download filename="Filename" />
        </div>
      </CourseAccordion>
    </div>
  );
}
