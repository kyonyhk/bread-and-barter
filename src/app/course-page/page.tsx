'use client';

import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import TimeslotButton from '@repo/components/atoms/buttons/TimeslotButton';
import Download from '@repo/components/atoms/download/Download';
import { LeftArrow, RightArrow } from '@repo/components/atoms/icons';
import CourseAccordion from '@repo/components/molecules/course-accordion/CourseAccordion';
import CourseDetails from '@repo/components/molecules/course-details/CourseDetails';
import CourseHero from '@repo/components/molecules/course-hero/CourseHero';
import CourseObjectiveTile from '@repo/components/molecules/course-objective-tile/CourseObjectiveTile';
import CourseSelectionTile from '@repo/components/molecules/course-selection-tile/CourseSelectionTile';
import TeacherProfile from '@repo/components/molecules/teacher-profile/TeacherProfile';
import Timeslot from '@repo/components/molecules/timeslot/timeslot';
import Link from 'next/link';
import { css } from 'styled-system/css';

const CoursePage = () => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '160px',
        paddingBottom: '160px',
      })}
    >
      <div
        className={css({
          maxW: '1080px',
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          justifyContent: 'flex-start',
        })}
      >
        {/* Left Column */}
        <div
          className={css({
            minW: '340px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
        >
          <Link href="/home">
            <ButtonLarge>
              Back
              <LeftArrow
                className={css({ fill: 'yellow100', w: '25px', h: '25px' })}
              />
            </ButtonLarge>
          </Link>

          <CourseHero
            teacherName="John Goh"
            courseName="Dry Laksa"
            bgVideo="/images/dry-laksa.png"
            teacherProfilePic="/images/profile-pic.png"
          />
          <ButtonLarge>
            Book
            <div
              className={css({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              })}
            >
              <div
                className={css({ textStyle: 'paragraph2', color: 'yellow80' })}
              >
                SGD 120 / Class
              </div>
              <RightArrow
                className={css({ fill: 'yellow100', w: '25px', h: '25px' })}
              />
            </div>
          </ButtonLarge>
        </div>

        {/* Right Column */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          })}
        >
          <TeacherProfile
            name="John Goh"
            genre="Culinary"
            lessonsTaught={20}
            reviewsCount={60}
          />

          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            })}
          >
            <div
              className={css({
                textStyle: 'subheading1',
                color: 'yellow100',
                padding: '0px 40px 0px 40px',
              })}
            >
              Pottery 101: From Clay to Creativity
            </div>

            {/* Course Selection */}
            <CourseAccordion title="Course Selection" initialExpanded={true}>
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
            <CourseAccordion title="Course Details" initialExpanded={true}>
              <CourseDetails
                duration="2 hours"
                courseDetails="This comprehensive pottery course is designed for individuals of all levels, from beginners with no prior experience to intermediate and advanced potters. Our expert instructors will guide you through the fascinating world of pottery, covering everything from basic hand-building techniques to advanced wheel-throwing and glazing methods."
              />
            </CourseAccordion>

            {/* Course Timeslots */}
            <CourseAccordion title="Course Timeslots" initialExpanded={true}>
              <div
                className={css({
                  w: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                })}
              >
                <Timeslot day="Wednesday">
                  <TimeslotButton startTime="2pm" endTime="4pm" />
                  <TimeslotButton startTime="5pm" endTime="7pm" />
                  <TimeslotButton startTime="8pm" endTime="10pm" />
                </Timeslot>
                <Timeslot day="Saturday">
                  <TimeslotButton startTime="2pm" endTime="4pm" />
                  <TimeslotButton startTime="5pm" endTime="7pm" />
                  <TimeslotButton startTime="8pm" endTime="10pm" />
                </Timeslot>
              </div>
            </CourseAccordion>

            {/* Course Objectives */}
            <CourseAccordion title="Course Objectives" initialExpanded={false}>
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

            {/* Credentials & Experience */}
            <CourseAccordion
              title="Credentials & Experience"
              initialExpanded={false}
            >
              <div className={css({ color: 'yellow50' })}>
                This comprehensive pottery course is designed for individuals of
                all levels, from beginners with no prior experience to
                intermediate and advanced potters. Our expert instructors will
                guide you through the fascinating world of pottery, covering
                everything from basic hand-building techniques to advanced
                wheel-throwing and glazing methods.
              </div>
            </CourseAccordion>

            {/* Course Materials */}
            <CourseAccordion title="Course Materials" initialExpanded={false}>
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

            {/* Course Requirements */}
            <CourseAccordion
              title="Course Requirements"
              initialExpanded={false}
            >
              <div className={css({ color: 'yellow50' })}>
                This comprehensive pottery course is designed for individuals of
                all levels, from beginners with no prior experience to
                intermediate and advanced potters. Our expert instructors will
                guide you through the fascinating world of pottery, covering
                everything from basic hand-building techniques to advanced
                wheel-throwing and glazing methods.
              </div>
            </CourseAccordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
