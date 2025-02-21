'use client';

import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import TimeslotButton from '@repo/components/atoms/calendar/TimeslotButton';
import Download from '@repo/components/atoms/download/Download';
import { LeftArrow } from '@repo/components/atoms/icons';
import AddCourse from '@repo/components/molecules/add-course/AddCourse';
import CourseAccordion from '@repo/components/molecules/course-accordion/CourseAccordion';
import CredentialsExperience from '@repo/components/molecules/course-credentials/CredentialsExperience';
import CourseDetails from '@repo/components/molecules/course-details/CourseDetails';
import CourseHero from '@repo/components/molecules/course-hero/CourseHero';
import CourseObjectives from '@repo/components/molecules/course-objectives/CourseObjectives';
import CourseSelectionTile from '@repo/components/molecules/course-selection-tile/CourseSelectionTile';
import Timeslot from '@repo/components/molecules/course-timeslots/Timeslot';
import TeacherProfile from '@repo/components/molecules/teacher-profile/TeacherProfile';
import { supabase } from '@repo/lib/supabase';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { css } from '../../../styled-system/css';

interface Course {
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
  program: {
    id: string;
    name: string;
    description: string;
    teacher: {
      id: string;
      first_name: string;
      last_name: string;
      description: string;
    };
  };
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
  courses?: Course[];
}

export default function CoursePage() {
  const searchParams = useSearchParams();
  const [course, setCourse] = useState<Course | null>(null);
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
    isEditingCourseSelection: false,
  });

  const [saveConfirmation, setSaveConfirmation] = useState({
    courseDetailsSaved: false,
    courseTimeslotsSaved: false,
    courseObjectivesSaved: false,
    credentialsExperienceSaved: false,
    courseRequirementsSaved: false,
    courseMaterialsSaved: false,
    courseSelectionSaved: false,
  });

  const [changesCancelled, setChangesCancelled] = useState({
    courseDetailsChangesCancelled: false,
    courseTimeslotsChangesCancelled: false,
    courseObjectivesChangesCancelled: false,
    credentialsExperienceChangesCancelled: false,
    courseRequirementsChangesCancelled: false,
    courseMaterialsChangesCancelled: false,
    courseSelectionChangesCancelled: false,
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

  const fetchCourseData = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('teaching.programs')
        .select(
          `
          *,
          teacher:teacher_id (
            id,
            raw_user_meta_data
          ),
          courses (
            *,
            course_objectives (
              *
            ),
            course_materials (
              *
            ),
            course_timeslots (
              *
            )
          )
        `
        )
        .eq('id', searchParams.get('id'))
        .single();

      if (error) throw error;
      setCourse(data);
    } catch (error) {
      console.error('Error fetching course:', error);
      setError('Failed to load course data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchParams.get('id')) return;
    fetchCourseData();
  }, [searchParams]);

  // Course Details
  const handleSaveCourseDetails = (data: {
    duration: string;
    classDetails: string;
  }) => {
    // TODO: Implement API call to save course details
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
    // TODO: Implement API call to save course objectives
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
    // TODO: Implement API call to save credentials & experience
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
        Loading course data...
      </div>
    );
  }

  if (error || !course) {
    return (
      <div
        className={css({
          color: 'red.500',
          textAlign: 'center',
          paddingTop: '160px',
        })}
      >
        {error || 'Course not found'}
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
            teacherName={`${course.program.teacher.first_name} ${course.program.teacher.last_name}`}
            courseName={course.name}
            bgVideo={course.image_url || '/images/default-course.jpg'}
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
                SGD {course.price} / Class
              </div>
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
            name={`${course.program.teacher.first_name} ${course.program.teacher.last_name}`}
            genre={course.program.name}
            lessonsTaught={20} // TODO: Get actual data
            reviewsCount={60} // TODO: Get actual data
            description={
              course.program.teacher.description || 'No description available.'
            }
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
              Advanced Italian Cuisine Program
            </div>
            <CourseAccordion
              title="Course Selection"
              initialExpanded={true}
              isEditing={editState.isEditingCourseSelection}
              onEdit={() => toggleEditState('isEditingCourseSelection')}
              onSave={() => {
                toggleEditState('isEditingCourseSelection');
                setSaveConfirmation({
                  ...saveConfirmation,
                  courseSelectionSaved: true,
                });
                setTimeout(
                  () =>
                    setSaveConfirmation({
                      ...saveConfirmation,
                      courseSelectionSaved: false,
                    }),
                  changesSavedTimeout
                );
              }}
              onCancel={() => {
                toggleEditState('isEditingCourseSelection');
                setChangesCancelled({
                  ...changesCancelled,
                  courseSelectionChangesCancelled: true,
                });
                setTimeout(
                  () =>
                    setChangesCancelled({
                      ...changesCancelled,
                      courseSelectionChangesCancelled: false,
                    }),
                  changesCancelledTimeout
                );
              }}
            >
              {editState.isEditingCourseSelection && (
                <AddCourse
                  onAdd={async (courseName, price) => {
                    try {
                      const { error } = await supabase
                        .from('teaching.courses')
                        .insert({
                          program_id: course?.program.id,
                          name: courseName,
                          price: price,
                          course_number: course?.courses?.length
                            ? course.courses.length + 1
                            : 1,
                          duration: '1 hour',
                          course_details: '',
                          max_students: 1,
                          is_group_session: false,
                          location: 'To be determined',
                        });

                      if (error) throw error;
                      await fetchCourseData();
                    } catch (error) {
                      console.error('Error adding course:', error);
                      setError('Failed to add course');
                    }
                  }}
                />
              )}
              <div
                className={css({
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '8px',
                })}
              >
                {course?.courses?.map((courseItem, index) => (
                  <CourseSelectionTile
                    key={courseItem.id}
                    courseNumber={courseItem.course_number}
                    courseName={courseItem.name}
                    price={courseItem.price}
                    isSelected={index === selectedCourseIndex}
                    onSelect={() => setSelectedCourseIndex(index)}
                    isEditing={editState.isEditingCourseSelection}
                    onDelete={async () => {
                      try {
                        const { error } = await supabase
                          .from('teaching.courses')
                          .delete()
                          .eq('id', courseItem.id);

                        if (error) throw error;
                        await fetchCourseData();
                      } catch (error) {
                        console.error('Error deleting course:', error);
                        setError('Failed to delete course');
                      }
                    }}
                  />
                ))}
              </div>
            </CourseAccordion>
          </div>

          {/* Course Details (use the selected course) */}
          {course?.courses?.[selectedCourseIndex] && (
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
                  justifyContent: 'center ',
                  alignItems: 'center',
                })}
              >
                <div
                  className={css({
                    textStyle: 'subheading5',
                    color: 'yellow50',
                  })}
                >
                  COURSE {String(course.course_number).padStart(2, '0')}
                </div>
                <div
                  className={css({
                    textStyle: 'subheading3',
                    color: 'yellow100',
                  })}
                >
                  {course.courses[selectedCourseIndex].name}
                </div>
              </div>

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
                  duration={course.courses[selectedCourseIndex].duration}
                  courseDetails={
                    course.courses[selectedCourseIndex].course_details
                  }
                  isEditing={editState.isEditingCourseDetails}
                  onSave={(data) => {
                    handleSaveCourseDetails({
                      duration: data.duration,
                      classDetails: data.classDetails,
                    });
                  }}
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
                  {course.courses[selectedCourseIndex].course_timeslots?.map(
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
                onEdit={() => toggleEditState('isEditingCourseObjectives')}
                onSave={handleSaveCourseObjectives}
                onCancel={handleCancelCourseObjectives}
                isEditing={editState.isEditingCourseObjectives}
                isSaved={saveConfirmation.courseObjectivesSaved}
                isCancelled={changesCancelled.courseObjectivesChangesCancelled}
              >
                <CourseObjectives
                  initialObjectives={course.courses[
                    selectedCourseIndex
                  ].course_objectives.map((obj) => obj.objective_text)}
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
                  experience={
                    course.courses[selectedCourseIndex].credentials_experience
                  }
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
                  {course.courses[selectedCourseIndex].course_materials?.map(
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
