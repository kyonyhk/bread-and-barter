'use client';

import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import Download from '@repo/components/atoms/download/Download';
import { LeftArrow } from '@repo/components/atoms/icons';
import CourseAccordion from '@repo/components/molecules/course-accordion/CourseAccordion';
import CredentialsExperience from '@repo/components/molecules/course-credentials/CredentialsExperience';
import CourseDetails from '@repo/components/molecules/course-details/CourseDetails';
import CourseHero from '@repo/components/molecules/course-hero/CourseHero';
import CourseObjectives from '@repo/components/molecules/course-objectives/CourseObjectives';
import TeacherProfile from '@repo/components/molecules/teacher-profile/TeacherProfile';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { css } from '../../../../styled-system/css';

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

export default function ProgramPage({ params }: { params: { id: string } }) {
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
    const fetchProgram = async () => {
      try {
        console.log('[Program Page] Fetching program data for ID:', params.id);
        const response = await fetch(`/api/programs/${params.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('[Program Page] Program data received:', data);
        setProgram(data);
        setError(null);
      } catch (error) {
        console.error('[Program Page] Error fetching program:', error);
        setError('Failed to load program data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgram();
  }, [params.id]);

  type EditStateKey = keyof typeof editState;

  const toggleEditState = (section: EditStateKey) => {
    setEditState((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const changesSavedTimeout = 2000;
  const changesCancelledTimeout = 1000;

  // Course Details
  const handleSaveCourseDetails = (data: {
    duration: string;
    classDetails: string;
  }) => {
    toggleEditState('isEditingCourseDetails');
    setSaveConfirmation({ ...saveConfirmation, courseDetailsSaved: true });
    setTimeout(
      () =>
        setSaveConfirmation({ ...saveConfirmation, courseDetailsSaved: false }),
      changesSavedTimeout
    );
  };

  const handleCancelCourseDetails = () => {
    toggleEditState('isEditingCourseDetails');
    setChangesCancelled({
      ...changesCancelled,
      courseDetailsChangesCancelled: true,
    });
    setTimeout(
      () =>
        setChangesCancelled({
          ...changesCancelled,
          courseDetailsChangesCancelled: false,
        }),
      changesCancelledTimeout
    );
  };

  // Course Objectives
  const handleSaveCourseObjectives = (data: string[]) => {
    toggleEditState('isEditingCourseObjectives');
    setSaveConfirmation({ ...saveConfirmation, courseObjectivesSaved: true });
    setTimeout(
      () =>
        setSaveConfirmation({
          ...saveConfirmation,
          courseObjectivesSaved: false,
        }),
      changesSavedTimeout
    );
  };

  const handleCancelCourseObjectives = () => {
    toggleEditState('isEditingCourseObjectives');
    setChangesCancelled({
      ...changesCancelled,
      courseObjectivesChangesCancelled: true,
    });
    setTimeout(
      () =>
        setChangesCancelled({
          ...changesCancelled,
          courseObjectivesChangesCancelled: false,
        }),
      changesCancelledTimeout
    );
  };

  // Credentials & Experience
  const handleSaveCredentialsExperience = (data: { experience: string }) => {
    toggleEditState('isEditingCredentialsExperience');
    setSaveConfirmation({
      ...saveConfirmation,
      credentialsExperienceSaved: true,
    });
    setTimeout(
      () =>
        setSaveConfirmation({
          ...saveConfirmation,
          credentialsExperienceSaved: false,
        }),
      changesSavedTimeout
    );
  };

  const handleCancelCredentialsExperience = () => {
    toggleEditState('isEditingCredentialsExperience');
    setChangesCancelled({
      ...changesCancelled,
      credentialsExperienceChangesCancelled: true,
    });
    setTimeout(
      () =>
        setChangesCancelled({
          ...changesCancelled,
          credentialsExperienceChangesCancelled: false,
        }),
      changesCancelledTimeout
    );
  };

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

  const selectedCourse = program.courses[selectedCourseIndex];
  const teacherName = `${program.teacher.raw_user_meta_data.first_name} ${program.teacher.raw_user_meta_data.last_name}`;

  return (
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
      {/* Back Button */}
      <div
        className={css({
          display: 'flex',
          w: '100vw',
          maxW: '1080px',
          padding: '0px 40px',
        })}
      >
        <Link href="/home">
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
            })}
          >
            <LeftArrow />
            <div
              className={css({ textStyle: 'subheading4', color: 'yellow100' })}
            >
              Back to Home
            </div>
          </div>
        </Link>
      </div>

      {/* Course Hero */}
      <CourseHero
        teacherName={teacherName}
        courseName={program.name}
        bgVideo="/images/default-program.jpg"
        teacherProfilePic="/images/profile-pic.png"
      />

      {/* Course Selection */}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          w: '100vw',
          maxW: '1080px',
          padding: '0px 40px',
        })}
      >
        {/* Course Selection Title */}
        <div className={css({ textStyle: 'heading3', color: 'yellow100' })}>
          Available Courses
        </div>

        {/* Course Selection Grid */}
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          })}
        >
          {program.courses.map((course, index) => (
            <CourseAccordion
              key={course.id}
              title={course.name}
              initialExpanded={index === selectedCourseIndex}
              isEditing={false}
              onEdit={() => setSelectedCourseIndex(index)}
            >
              <div className={css({ color: 'yellow50' })}>
                {course.description}
                <div className={css({ color: 'yellow80', marginTop: '8px' })}>
                  Duration: {course.duration}
                </div>
                <div className={css({ color: 'yellow80' })}>
                  Price: SGD {course.price}
                </div>
              </div>
            </CourseAccordion>
          ))}
        </div>
      </div>

      {selectedCourse && (
        <>
          {/* Course Details */}
          <CourseAccordion
            title="Course Details"
            initialExpanded={true}
            onEdit={() => toggleEditState('isEditingCourseDetails')}
            onSave={handleSaveCourseDetails}
            onCancel={handleCancelCourseDetails}
            isEditing={editState.isEditingCourseDetails}
            isSaved={saveConfirmation.courseDetailsSaved}
            isCancelled={changesCancelled.courseDetailsChangesCancelled}
          >
            <CourseDetails
              duration={selectedCourse.duration}
              courseDetails={selectedCourse.course_details}
              isEditing={editState.isEditingCourseDetails}
              onSave={(data: { duration: string; classDetails: string }) =>
                handleSaveCourseDetails(data)
              }
              onCancel={handleCancelCourseDetails}
            />
          </CourseAccordion>

          {/* Course Objectives */}
          <CourseAccordion
            title="Course Objectives"
            initialExpanded={false}
            onEdit={() => toggleEditState('isEditingCourseObjectives')}
            onSave={handleSaveCourseObjectives}
            onCancel={handleCancelCourseObjectives}
            isEditing={editState.isEditingCourseObjectives}
            isSaved={saveConfirmation.courseObjectivesSaved}
            isCancelled={changesCancelled.courseObjectivesChangesCancelled}
          >
            <CourseObjectives
              initialObjectives={selectedCourse.course_objectives.map(
                (obj) => obj.objective_text
              )}
              isEditing={editState.isEditingCourseObjectives}
              onSave={handleSaveCourseObjectives}
              onCancel={handleCancelCourseObjectives}
            />
          </CourseAccordion>

          {/* Teacher Profile */}
          <TeacherProfile
            name={teacherName}
            genre="Teaching"
            lessonsTaught={100}
            reviewsCount={50}
          />

          {/* Credentials & Experience */}
          <CourseAccordion
            title="Credentials & Experience"
            initialExpanded={false}
            onEdit={() => toggleEditState('isEditingCredentialsExperience')}
            onSave={handleSaveCredentialsExperience}
            onCancel={handleCancelCredentialsExperience}
            isEditing={editState.isEditingCredentialsExperience}
            isSaved={saveConfirmation.credentialsExperienceSaved}
            isCancelled={changesCancelled.credentialsExperienceChangesCancelled}
          >
            <CredentialsExperience
              experience={selectedCourse.credentials_experience || ''}
              isEditing={editState.isEditingCredentialsExperience}
              onSave={handleSaveCredentialsExperience}
              onCancel={handleCancelCredentialsExperience}
            />
          </CourseAccordion>

          {/* Course Materials */}
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              w: '100vw',
              maxW: '1080px',
              padding: '0px 40px',
            })}
          >
            <div className={css({ textStyle: 'heading3', color: 'yellow100' })}>
              Course Materials
            </div>
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              })}
            >
              {selectedCourse.course_materials.map((material) => (
                <Download
                  key={material.name}
                  filename={material.name}
                  fileUrl={material.file_url}
                />
              ))}
            </div>
          </div>

          {/* Course Timeslots */}
          <CourseAccordion
            title="Course Timeslots"
            initialExpanded={true}
            onEdit={() => toggleEditState('isEditingCourseTimeslots')}
            isEditing={editState.isEditingCourseTimeslots}
          >
            <div
              className={css({
                w: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              })}
            >
              {selectedCourse.course_timeslots?.map((timeslot, index) => (
                <div key={index}>
                  <div
                    className={css({ color: 'yellow100', marginBottom: '8px' })}
                  >
                    {timeslot.day}
                  </div>
                  <div
                    className={css({
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap',
                    })}
                  >
                    {timeslot.slots.map((slot, slotIndex) => (
                      <div
                        key={slotIndex}
                        className={css({
                          padding: '8px 16px',
                          borderRadius: '20px',
                          border: '1px solid',
                          borderColor: 'yellow10',
                          color: 'yellow100',
                        })}
                      >
                        {slot.startTime} - {slot.endTime}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CourseAccordion>

          {/* Book Now Button */}
          <ButtonLarge>Book Now</ButtonLarge>
        </>
      )}
    </div>
  );
}
