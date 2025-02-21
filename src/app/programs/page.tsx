'use client';

import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import TimeslotButton from '@repo/components/atoms/calendar/TimeslotButton';
import Download from '@repo/components/atoms/download/Download';
import { LeftArrow } from '@repo/components/atoms/icons';
import CourseAccordion from '@repo/components/molecules/course-accordion/CourseAccordion';
import CredentialsExperience from '@repo/components/molecules/course-credentials/CredentialsExperience';
import CourseDetails from '@repo/components/molecules/course-details/CourseDetails';
import CourseHero from '@repo/components/molecules/course-hero/CourseHero';
import CourseObjectives from '@repo/components/molecules/course-objectives/CourseObjectives';
import CourseSelectionTile from '@repo/components/molecules/course-selection-tile/CourseSelectionTile';
import Timeslot from '@repo/components/molecules/course-timeslots/Timeslot';
import TeacherProfile from '@repo/components/molecules/teacher-profile/TeacherProfile';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { css } from '../../../styled-system/css';

interface Program {
  id: string;
  name: string;
  description: string;
  teacher: {
    id: string;
    raw_user_meta_data: {
      first_name: string;
      last_name: string;
      description: string;
    };
  };
  courses: {
    id: string;
    course_number: number;
    name: string;
    description: string;
    price: number;
    duration: string;
    course_details: string;
    max_students: number;
    is_group_session: boolean;
    location: string;
    credentials_experience: string;
    requirements: string;
    image_url: string;
    course_objectives: {
      objective_number: number;
      objective_text: string;
    }[];
    course_materials: {
      name: string;
      file_url: string;
    }[];
    course_timeslots: {
      day: string;
      slots: {
        startTime: string;
        endTime: string;
      }[];
    }[];
  }[];
}

export default function ProgramsPage() {
  const searchParams = useSearchParams();
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);

  const [editState, setEditState] = useState({
    isEditingCourseDetails: false,
    isEditingCourseTimeslots: false,
    isEditingCourseObjectives: false,
    isEditingCredentialsExperience: false,
    isEditingCourseRequirements: false,
    isEditingCourseMaterials: false,
  });

  const [saveConfirmation, setSaveConfirmation] = useState({
    courseDetailsSaved: false,
    courseTimeslotsSaved: false,
    courseObjectivesSaved: false,
    credentialsExperienceSaved: false,
    courseRequirementsSaved: false,
    courseMaterialsSaved: false,
  });

  const [changesCancelled, setChangesCancelled] = useState({
    courseDetailsChangesCancelled: false,
    courseTimeslotsChangesCancelled: false,
    courseObjectivesChangesCancelled: false,
    credentialsExperienceChangesCancelled: false,
    courseRequirementsChangesCancelled: false,
    courseMaterialsChangesCancelled: false,
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        console.log('[Programs Page] Fetching programs data');
        const response = await fetch('/api/programs');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('[Programs Page] Programs data received:', data);
        // For now, we'll just use the first program
        setProgram(data[0]);
        setError(null);
      } catch (error) {
        console.error('[Programs Page] Error fetching programs:', error);
        setError('Failed to load programs data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, [searchParams]);

  if (isLoading) {
    return (
      <div
        className={css({
          color: 'yellow50',
          textAlign: 'center',
          paddingTop: '160px',
        })}
      >
        Loading program data...
      </div>
    );
  }

  if (error || !program) {
    return (
      <div
        className={css({
          color: 'red.500',
          textAlign: 'center',
          paddingTop: '160px',
        })}
      >
        {error || 'Program not found'}
      </div>
    );
  }

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
                className={css({ fill: 'yellow100', w: '23px', h: '23px' })}
              />
            </ButtonLarge>
          </Link>

          <CourseHero
            teacherName={`${program.teacher.raw_user_meta_data.first_name} ${program.teacher.raw_user_meta_data.last_name}`}
            courseName={program.name}
            bgVideo={
              program.courses[0]?.image_url || '/images/default-course.jpg'
            }
            teacherProfilePic="/images/profile-pic.png"
          />
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
            name={`${program.teacher.raw_user_meta_data.first_name} ${program.teacher.raw_user_meta_data.last_name}`}
            genre={program.name}
            lessonsTaught={20} // TODO: Get actual data
            reviewsCount={60} // TODO: Get actual data
          />

          {/* Course Selection */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            })}
          >
            <div
              className={css({ textStyle: 'subheading1', color: 'yellow100' })}
            >
              {program.name}
            </div>
            <CourseAccordion
              title="Course Selection"
              initialExpanded={true}
              isEditing={false}
              onEdit={() => {}}
            >
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '8px',
                })}
              >
                {program.courses.map((courseItem, index) => (
                  <CourseSelectionTile
                    key={courseItem.id}
                    courseNumber={courseItem.course_number}
                    courseName={courseItem.name}
                    price={courseItem.price}
                    isSelected={index === selectedCourseIndex}
                    onSelect={() => setSelectedCourseIndex(index)}
                  />
                ))}
              </div>
            </CourseAccordion>
          </div>

          {/* Course Details (use the selected course) */}
          {program.courses[selectedCourseIndex] && (
            <div
              className={css({
                display: 'flex',
                flexDir: 'column',
                gap: '24px',
                padding: '16px',
                bg: 'yellow5',
                borderWidth: '1px',
                borderColor: 'yellow20',
                borderRadius: '40px',
              })}
            >
              <div
                className={css({
                  display: 'flex',
                  flexDir: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                })}
              >
                <div
                  className={css({
                    textStyle: 'subheading5',
                    color: 'yellow50',
                  })}
                >
                  COURSE{' '}
                  {String(
                    program.courses[selectedCourseIndex].course_number
                  ).padStart(2, '0')}
                </div>
                <div
                  className={css({
                    textStyle: 'subheading3',
                    color: 'yellow100',
                  })}
                >
                  {program.courses[selectedCourseIndex].name}
                </div>
              </div>

              {/* Course Details */}
              <CourseAccordion
                title="Course Details"
                initialExpanded={true}
                isEditing={false}
                onEdit={() => {}}
              >
                <CourseDetails
                  duration={program.courses[selectedCourseIndex].duration}
                  courseDetails={
                    program.courses[selectedCourseIndex].course_details
                  }
                  isEditing={false}
                  onSave={() => {}}
                  onCancel={() => {}}
                />
              </CourseAccordion>

              {/* Course Timeslots */}
              <CourseAccordion
                title="Course Timeslots"
                initialExpanded={true}
                isEditing={false}
                onEdit={() => {}}
              >
                <div
                  className={css({
                    w: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                  })}
                >
                  {program.courses[selectedCourseIndex].course_timeslots?.map(
                    (timeslot, index) => (
                      <Timeslot key={index} day={timeslot.day}>
                        {timeslot.slots.map((slot, slotIndex) => (
                          <TimeslotButton
                            key={slotIndex}
                            startTime={slot.startTime}
                            endTime={slot.endTime}
                          />
                        ))}
                      </Timeslot>
                    )
                  )}
                </div>
              </CourseAccordion>

              {/* Course Objectives */}
              <CourseAccordion
                title="Course Objectives"
                initialExpanded={false}
                isEditing={false}
                onEdit={() => {}}
              >
                <CourseObjectives
                  initialObjectives={program.courses[
                    selectedCourseIndex
                  ].course_objectives.map((obj) => obj.objective_text)}
                  isEditing={false}
                  onSave={() => {}}
                  onCancel={() => {}}
                />
              </CourseAccordion>

              {/* Credentials & Experience */}
              <CourseAccordion
                title="Credentials & Experience"
                initialExpanded={false}
                isEditing={false}
                onEdit={() => {}}
              >
                <CredentialsExperience
                  experience={
                    program.courses[selectedCourseIndex].credentials_experience
                  }
                  isEditing={false}
                  onSave={() => {}}
                  onCancel={() => {}}
                />
              </CourseAccordion>

              {/* Course Materials */}
              <CourseAccordion
                title="Course Materials"
                initialExpanded={false}
                isEditing={false}
                onEdit={() => {}}
              >
                <div
                  className={css({
                    w: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  })}
                >
                  {program.courses[selectedCourseIndex].course_materials?.map(
                    (material, index) => (
                      <Download key={index} filename={material.name} />
                    )
                  )}
                </div>
              </CourseAccordion>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
