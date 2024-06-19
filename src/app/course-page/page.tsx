'use client';

import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import TimeslotButton from '@repo/components/atoms/buttons/TimeslotButton';
import Download from '@repo/components/atoms/download/Download';
import { LeftArrow, RightArrow } from '@repo/components/atoms/icons';
import CourseAccordion from '@repo/components/molecules/course-accordion/CourseAccordion';
import CourseDetails from '@repo/components/molecules/course-details/CourseDetails';
import CourseHero from '@repo/components/molecules/course-hero/CourseHero';
import CourseObjectives from '@repo/components/molecules/course-objectives/CourseObjectives';
import CourseRequirements from '@repo/components/molecules/course-requirements/CourseRequirements';
import CourseSelectionTile from '@repo/components/molecules/course-selection-tile/CourseSelectionTile';
import CredentialsExperience from '@repo/components/molecules/credentials-experience/CredentialsExperience';
import TeacherProfile from '@repo/components/molecules/teacher-profile/TeacherProfile';
import Timeslot from '@repo/components/molecules/timeslot/timeslot';
import Link from 'next/link';
import { useState } from 'react';
import { css } from 'styled-system/css';

const CoursePage = () => {
  const [editState, setEditState] = useState({
    isEditingCourseSelection: false,
    isEditingCourseDetails: false,
    isEditingCourseTimeslots: false,
    isEditingCourseObjectives: false,
    isEditingCredentialsExperience: false,
    isEditingCourseRequirements: false,
    isEditingCourseMaterials: false,
  });

  const [saveConfirmation, setSaveConfirmation] = useState({
    courseSelectionSaved: false,
    courseDetailsSaved: false,
    courseTimeslotsSaved: false,
    courseObjectivesSaved: false,
    credentialsExperienceSaved: false,
    courseRequirementsSaved: false,
    courseMaterialsSaved: false,
  });

  const [changesCancelled, setChangesCancelled] = useState({
    courseSelectionChangesCancelled: false,
    courseDetailsChangesCancelled: false,
    courseTimeslotsChangesCancelled: false,
    courseObjectivesChangesCancelled: false,
    credentialsExperienceChangesCancelled: false,
    courseRequirementsChangesCancelled: false,
    courseMaterialsChangesCancelled: false,
  });

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
  const [courseDetails, setCourseDetails] = useState({
    duration: '2 hours',
    courseDetails:
      'This comprehensive pottery course is designed for individuals of all levels, from beginners with no prior experience to intermediate and advanced potters. Our expert instructors will guide you through the fascinating world of pottery, covering everything from basic hand-building techniques to advanced wheel-throwing and glazing methods.',
  });

  const handleSaveCourseDetails = (data: {
    duration: string;
    courseDetails: string;
  }) => {
    setCourseDetails(data);
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
  const [courseObjectives, setCourseObjectives] = useState<string[]>([
    'Develop a strong foundation in pottery, including clay preparation and studio safety.',
  ]);

  const handleSaveCourseObjectives = (data: string[]) => {
    setCourseObjectives(data);
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
  const [credentialsExperience, setCredentialsExperience] = useState(
    'This comprehensive pottery course is designed for individuals of all levels, from beginners with no prior experience to intermediate and advanced potters. Our expert instructors will guide you through the fascinating world of pottery, covering everything from basic hand-building techniques to advanced wheel-throwing and glazing methods.'
  );

  const handleSaveCredentialsExperience = (data: { experience: string }) => {
    setCredentialsExperience(data.experience);
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

  // Course Requirements
  const [courseRequirements, setCourseRequirements] = useState(
    'This comprehensive pottery course is designed for individuals of all levels, from beginners with no prior experience to intermediate and advanced potters. Our expert instructors will guide you through the fascinating world of pottery, covering everything from basic hand-building techniques to advanced wheel-throwing and glazing methods.'
  );

  const handleSaveCourseRequirements = (data: { requirements: string }) => {
    setCourseRequirements(data.requirements);
    toggleEditState('isEditingCourseRequirements');
    setSaveConfirmation({ ...saveConfirmation, courseRequirementsSaved: true });
    setTimeout(
      () =>
        setSaveConfirmation({
          ...saveConfirmation,
          courseRequirementsSaved: false,
        }),
      changesSavedTimeout
    );
  };

  const handleCancelCourseRequirements = () => {
    toggleEditState('isEditingCourseRequirements');
    setChangesCancelled({
      ...changesCancelled,
      courseRequirementsChangesCancelled: true,
    });
    setTimeout(
      () =>
        setChangesCancelled({
          ...changesCancelled,
          courseRequirementsChangesCancelled: false,
        }),
      changesCancelledTimeout
    );
  };

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
                className={css({ fill: 'yellow100', w: '23px', h: '23px' })}
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
                padding: '0px 24px 0px 24px',
              })}
            >
              Pottery 101: From Clay to Creativity
            </div>

            {/* Course Selection */}
            <CourseAccordion
              title="Course Selection"
              initialExpanded={true}
              onEdit={() => toggleEditState('isEditingCourseSelection')}
              onSave={() => {}}
              onCancel={() => {}}
              isEditing={editState.isEditingCourseSelection}
              isSaved={saveConfirmation.courseSelectionSaved}
              isCancelled={changesCancelled.courseSelectionChangesCancelled}
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
              <CourseSelectionTile
                courseNumber={3}
                courseName="Introduction to Culinary II"
                price={200}
              />
            </CourseAccordion>

            {/* Course Details */}
            <CourseAccordion
              title="Course Details"
              initialExpanded={true}
              onEdit={() => {
                toggleEditState('isEditingCourseDetails');
              }}
              onSave={handleSaveCourseDetails}
              onCancel={handleCancelCourseDetails}
              isEditing={editState.isEditingCourseDetails}
              isSaved={saveConfirmation.courseDetailsSaved}
              isCancelled={changesCancelled.courseDetailsChangesCancelled}
            >
              <CourseDetails
                duration={courseDetails.duration}
                courseDetails={courseDetails.courseDetails}
                isEditing={editState.isEditingCourseDetails}
                onSave={handleSaveCourseDetails}
                onCancel={handleCancelCourseDetails}
              />
            </CourseAccordion>

            {/* Course Timeslots */}
            <CourseAccordion
              title="Course Timeslots"
              initialExpanded={true}
              onEdit={() => toggleEditState('isEditingCourseTimeslots')}
              onSave={() => {}}
              onCancel={() => {}}
              isEditing={editState.isEditingCourseTimeslots}
              isSaved={saveConfirmation.courseTimeslotsSaved}
              isCancelled={changesCancelled.courseTimeslotsChangesCancelled}
            >
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
                initialObjectives={courseObjectives}
                isEditing={editState.isEditingCourseObjectives}
                onSave={handleSaveCourseObjectives}
                onCancel={handleCancelCourseObjectives}
              />
            </CourseAccordion>

            {/* Credentials & Experience */}
            <CourseAccordion
              title="Credentials & Experience"
              initialExpanded={false}
              onEdit={() => toggleEditState('isEditingCredentialsExperience')}
              onSave={handleSaveCredentialsExperience}
              onCancel={handleCancelCredentialsExperience}
              isEditing={editState.isEditingCredentialsExperience}
              isSaved={saveConfirmation.credentialsExperienceSaved}
              isCancelled={
                changesCancelled.credentialsExperienceChangesCancelled
              }
            >
              <CredentialsExperience
                experience={credentialsExperience}
                isEditing={editState.isEditingCredentialsExperience}
                onSave={handleSaveCredentialsExperience}
                onCancel={handleCancelCredentialsExperience}
              />
            </CourseAccordion>

            {/* Course Materials */}
            <CourseAccordion
              title="Course Materials"
              initialExpanded={false}
              onEdit={() => toggleEditState('isEditingCourseMaterials')}
              onSave={() => {}}
              onCancel={() => {}}
              isEditing={editState.isEditingCourseMaterials}
              isSaved={saveConfirmation.courseMaterialsSaved}
              isCancelled={changesCancelled.courseMaterialsChangesCancelled}
            >
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
              onEdit={() => toggleEditState('isEditingCourseRequirements')}
              onSave={handleSaveCourseRequirements}
              onCancel={handleCancelCourseRequirements}
              isEditing={editState.isEditingCourseRequirements}
              isSaved={saveConfirmation.courseRequirementsSaved}
              isCancelled={changesCancelled.courseRequirementsChangesCancelled}
            >
              <CourseRequirements
                requirements={courseRequirements}
                isEditing={editState.isEditingCourseRequirements}
                onSave={handleSaveCourseRequirements}
                onCancel={handleCancelCourseRequirements}
              />
            </CourseAccordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
