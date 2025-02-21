'use client';

import { useAuth } from '@repo/app/auth/AuthContext';
import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import { Divider } from '@repo/components/atoms/divider';
import { LeftArrow } from '@repo/components/atoms/icons';
import Checklist from '@repo/components/molecules/checklist/Checklist';
import CourseCreationProgress from '@repo/components/molecules/course-creation-progress/CourseCreationProgress';
import CourseCredentialsSection from '@repo/components/molecules/course-credentials/CourseCredentialsSection';
import CourseDetailsSection from '@repo/components/molecules/course-details/CourseDetailsSection';
import CourseHero from '@repo/components/molecules/course-hero/CourseHero';
import CourseMaterialsSection from '@repo/components/molecules/course-materials/CourseMaterialsSection';
import CourseObjectivesSection from '@repo/components/molecules/course-objectives/CourseObjectivesSection';
import CourseSelectionSection from '@repo/components/molecules/course-selection/CourseSelectionSection';
import CourseTimeslotsSection from '@repo/components/molecules/course-timeslots/CourseTimeslotsSection';
import TeacherProfile from '@repo/components/molecules/teacher-profile/TeacherProfile';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
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
    course_objectives: Array<{
      objective_number: number;
      objective_text: string;
    }>;
    course_materials: Array<{
      name: string;
      file_url: string;
    }>;
    course_timeslots: Array<{
      day: string;

      slots: Array<{
        startTime: string;
        endTime: string;
      }>;
    }>;
  }[];
}

interface DownloadProps {
  key: number;
  filename: string;
  url: string;
}

export default function ProgramPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const [program, setProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [hasChanges, setHasChanges] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [currentCredentialsExperience, setCurrentCredentialsExperience] =
    useState('');
  const [isNewCourse, setIsNewCourse] = useState(false);
  const [checklistProgress, setChecklistProgress] = useState({
    step1Completed: false,
    step2Completed: false,
    step3Completed: false,
  });
  const [isChecklistExpanded, setIsChecklistExpanded] = useState(true);

  const [editState, setEditState] = useState({
    isEditingCourseDetails: false,
    isEditingCourseTimeslots: false,
    isEditingCourseObjectives: false,
    isEditingCredentialsExperience: false,
    isEditingCourseRequirements: false,
    isEditingCourseMaterials: false,
    isEditingCourses: false,
  });

  const [isAddingCourse, setIsAddingCourse] = useState(false);

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

  const [changesSaved, setChangesSaved] = useState({
    courseDetailsChangesSaved: false,
    courseTimeslotsChangesSaved: false,
    courseObjectivesChangesSaved: false,
    credentialsExperienceChangesSaved: false,
    courseRequirementsChangesSaved: false,
    courseMaterialsChangesSaved: false,
    courseSelectionChangesSaved: false,
  });

  const changesSavedTimeout = 2000;
  const changesCancelledTimeout = 1000;

  const [isSubmitting, setIsSubmitting] = useState(false);

  type EditStateKey = keyof typeof editState;
  const toggleEditState = (section: EditStateKey) => {
    setEditState((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const fetchProgram = async () => {
    try {
      console.log(
        '[Program Page] Starting to fetch program data for ID:',
        params.id
      );
      const response = await fetch(`/api/programs/${params.id}`);

      if (!response.ok) {
        console.error('[Program Page] HTTP error:', response.status);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('[Program Page] Raw program data received:', data);
      console.log('[Program Page] Number of courses:', data.courses?.length);

      if (data.courses?.length > 0) {
        console.log(
          '[Program Page] Course list:',
          data.courses.map(
            (c: {
              id: string;
              name: string;
              course_number: number;
              course_materials: any[];
            }) => ({
              id: c.id,
              name: c.name,
              course_number: c.course_number,
              materialsCount: c.course_materials?.length || 0,
              materials: c.course_materials,
            })
          )
        );
      }

      setProgram(data);
      setError(null);
    } catch (error) {
      console.error('[Program Page] Error fetching program:', error);
      setError('Failed to load program data. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProgram();
  }, [params.id]);

  useEffect(() => {
    if (program && program.courses.length > 0) {
      const selectedCourse = program.courses[selectedCourseIndex];
      // Check if this is a new course by checking if essential fields are empty
      const isNew =
        !selectedCourse.course_details ||
        !selectedCourse.credentials_experience ||
        selectedCourse.course_objectives.length === 0;
      setIsNewCourse(isNew);
    }
  }, [program, selectedCourseIndex]);

  const selectedCourse = program?.courses[selectedCourseIndex];

  // Add useEffect to track checklist progress
  useEffect(() => {
    if (selectedCourse) {
      // Course Details - More granular checks
      const durationComplete = Boolean(selectedCourse.duration);
      const courseDetailsComplete = Boolean(
        selectedCourse.course_details?.length >= 50 // Minimum length for meaningful description
      );
      const maxStudentsComplete = selectedCourse.max_students > 0;
      const locationComplete = Boolean(selectedCourse.location?.trim());
      const courseDetailsAllComplete =
        durationComplete &&
        courseDetailsComplete &&
        maxStudentsComplete &&
        locationComplete;

      // Course Objectives - More granular checks
      const hasMinimumObjectives = selectedCourse.course_objectives.length >= 3;
      const objectivesHaveContent = selectedCourse.course_objectives.every(
        (obj) => obj.objective_text?.trim().length >= 10
      );
      const objectivesProperlyNumbered = selectedCourse.course_objectives.every(
        (obj, idx) => obj.objective_number === idx + 1
      );
      const courseObjectivesComplete =
        hasMinimumObjectives &&
        objectivesHaveContent &&
        objectivesProperlyNumbered;

      // Credentials - More granular checks
      const hasCredentials = Boolean(selectedCourse.credentials_experience);
      const credentialsMinLength =
        (selectedCourse.credentials_experience?.length ?? 0) >= 100;
      const credentialsComplete = hasCredentials && credentialsMinLength;

      // Materials - More granular checks
      const hasMinimumMaterials = selectedCourse.course_materials.length >= 1;
      const materialsHaveUrls = selectedCourse.course_materials.every(
        (material) => Boolean(material.file_url)
      );
      const materialsComplete = hasMinimumMaterials && materialsHaveUrls;

      // Timeslots - More granular checks
      const hasMinimumTimeslots = selectedCourse.course_timeslots.length >= 1;
      const timeslotsHaveSlots = selectedCourse.course_timeslots.every(
        (timeslot) => timeslot.slots && timeslot.slots.length > 0
      );
      const timeslotsComplete = hasMinimumTimeslots && timeslotsHaveSlots;

      // Step completion logic
      const step1Complete = true;

      const step2Complete =
        courseDetailsAllComplete &&
        courseObjectivesComplete &&
        credentialsComplete &&
        materialsComplete &&
        timeslotsComplete;

      const step3Complete = false;

      setChecklistProgress({
        step1Completed: step1Complete,
        step2Completed: step2Complete,
        step3Completed: step3Complete,
      });

      // Detailed logging for debugging
      console.log('[ProgramPage] Detailed checklist progress:', {
        courseDetails: {
          duration: durationComplete,
          description: courseDetailsComplete,
          maxStudents: maxStudentsComplete,
          location: locationComplete,
          allComplete: courseDetailsAllComplete,
        },
        objectives: {
          minimumCount: hasMinimumObjectives,
          contentQuality: objectivesHaveContent,
          properNumbering: objectivesProperlyNumbered,
          allComplete: courseObjectivesComplete,
        },
        credentials: {
          exists: hasCredentials,
          meetsLength: credentialsMinLength,
          allComplete: credentialsComplete,
        },
        materials: {
          minimumCount: hasMinimumMaterials,
          validUrls: materialsHaveUrls,
          allComplete: materialsComplete,
        },
        timeslots: {
          minimumCount: hasMinimumTimeslots,
          validSlots: timeslotsHaveSlots,
          allComplete: timeslotsComplete,
        },
        steps: {
          step1Complete,
          step2Complete,
          step3Complete,
        },
      });
    }
  }, [selectedCourse]);

  const handleCourseMaterialsSave = async () => {
    try {
      setChangesSaved((prev) => ({
        ...prev,
        courseMaterialsChangesSaved: true,
      }));
      setTimeout(() => {
        setChangesSaved((prev) => ({
          ...prev,
          courseMaterialsChangesSaved: false,
        }));
      }, changesSavedTimeout);
      // Refetch program data to update UI
      await fetchProgram();
    } catch (error) {
      console.error('Error saving course materials:', error);
    }
  };

  const handleSubmitForApproval = () => {
    setIsSubmitting(true);
    // Update the progress to step 3
    setChecklistProgress((prev) => ({
      ...prev,
      step2Completed: true,
      step3Completed: false, // Initially false as it's pending approval
    }));
    // TODO: Add API call to submit for approval
    setIsSubmitting(false);
  };

  // Add a check for user authorization
  const isAuthorized = useMemo(() => {
    if (!user || !program) return false;
    const isAdmin = user.user_metadata?.is_admin === true;
    const isTeacher = program.teacher.id === user.id;
    return isAdmin || isTeacher;
  }, [user, program]);

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
        height: '100vh',
        overflow: 'hidden',
        paddingTop: '120px',
      })}
    >
      {isNewCourse && (
        <div
          className={css({
            maxW: '1080px',
            w: '100%',
            mb: '40px',
          })}
        >
          <CourseCreationProgress
            currentStep={2}
            checklistProgress={checklistProgress}
            teacherId={program?.teacher?.id}
          />
        </div>
      )}

      <div
        className={css({
          position: 'fixed',
          top: '108px',
          right: '8px',
          zIndex: 10,
        })}
      >
        {isAuthorized && (
          <Checklist
            isExpanded={isChecklistExpanded}
            onToggle={() => setIsChecklistExpanded(!isChecklistExpanded)}
            className={css({
              position: 'sticky',
              top: '0px',
              alignSelf: 'flex-end',
            })}
            onSubmitForApproval={handleSubmitForApproval}
            isSubmitting={isSubmitting}
            courseDetails={{
              duration: !!selectedCourse?.duration,
              description: !!selectedCourse?.description,
              maxStudents: !!selectedCourse?.max_students,
              location: !!selectedCourse?.location,
              allComplete:
                !!selectedCourse?.duration &&
                !!selectedCourse?.description &&
                !!selectedCourse?.max_students &&
                !!selectedCourse?.location,
            }}
            objectives={{
              minimumCount:
                (selectedCourse?.course_objectives?.length || 0) > 0,
              contentQuality:
                (selectedCourse?.course_objectives?.length || 0) > 0,
              properNumbering:
                (selectedCourse?.course_objectives?.length || 0) > 0,
              allComplete: (selectedCourse?.course_objectives?.length || 0) > 0,
            }}
            credentials={{
              exists: !!selectedCourse?.credentials_experience,
              meetsLength: !!selectedCourse?.credentials_experience,
              allComplete: !!selectedCourse?.credentials_experience,
            }}
            materials={{
              minimumCount:
                (selectedCourse?.course_materials?.length || 0) >= 1,
              validUrls: true,
              allComplete: (selectedCourse?.course_materials?.length || 0) >= 1,
            }}
            timeslots={{
              minimumCount:
                (selectedCourse?.course_timeslots?.length || 0) >= 1,
              validSlots: true,
              allComplete: (selectedCourse?.course_timeslots?.length || 0) >= 1,
            }}
          />
        )}
      </div>

      <div
        className={css({
          maxW: '1080px',
          w: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: '16px',
          margin: '0 auto',
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
        })}
      >
        {/* Left column - fixed */}
        <div
          className={css({
            w: '340px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            height: 'fit-content',
          })}
        >
          <Link
            href="/home"
            className={css({
              display: 'block',
              w: '100%',
            })}
          >
            <ButtonLarge className={css({ w: '340px' })}>
              <LeftArrow
                className={css({ fill: 'yellow100', w: '24px', h: '24px' })}
              />
              Back
            </ButtonLarge>
          </Link>

          <CourseHero
            teacherName={`${program.teacher.raw_user_meta_data.first_name} ${program.teacher.raw_user_meta_data.last_name}`}
            courseName={program.name}
            bgVideo={
              program.courses[0]?.image_url || '/images/default-course.jpg'
            }
            teacherProfilePic="/images/profile-pic.png"
            isCreating={true}
            onUploadComplete={async (url) => {
              // Update the course image URL in the database
              try {
                const response = await fetch(
                  `/api/programs/${program.id}/courses/${program.courses[0].id}`,
                  {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      image_url: url,
                    }),
                  }
                );

                if (!response.ok) {
                  throw new Error('Failed to update course image');
                }

                // Update local state
                setProgram((prev) => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    courses: prev.courses.map((course, index) =>
                      index === 0 ? { ...course, image_url: url } : course
                    ),
                  };
                });
              } catch (error) {
                console.error('Error updating course image:', error);
                alert('Failed to update course image. Please try again.');
              }
            }}
          />
        </div>

        {/* Right column - scrollable */}
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            flex: 1,
            overflowY: 'auto',
            paddingRight: '16px',
            paddingBottom: '80px',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            })}
          >
            <TeacherProfile
              name={`${program.teacher.raw_user_meta_data.first_name} ${program.teacher.raw_user_meta_data.last_name}`}
              genre={program.name}
              lessonsTaught={20}
              reviewsCount={60}
              description={
                program.teacher.raw_user_meta_data.description ||
                'No description available.'
              }
            />
            <div
              className={css({
                textStyle: 'subheading1',
                color: 'yellow100',
              })}
            >
              {program.name}
            </div>
            <CourseSelectionSection
              courses={program.courses}
              selectedCourseIndex={selectedCourseIndex}
              onSelectCourse={setSelectedCourseIndex}
              isEditing={editState.isEditingCourses}
              onEdit={() => toggleEditState('isEditingCourses')}
              onSave={() => {
                toggleEditState('isEditingCourses');
                setChangesSaved((prev) => ({
                  ...prev,
                  courseSelectionChangesSaved: true,
                }));
                setTimeout(() => {
                  setChangesSaved((prev) => ({
                    ...prev,
                    courseSelectionChangesSaved: false,
                  }));
                }, changesSavedTimeout);
              }}
              onCancel={() => {
                toggleEditState('isEditingCourses');
                setChangesCancelled((prev) => ({
                  ...prev,
                  courseSelectionChangesCancelled: true,
                }));
                setTimeout(() => {
                  setChangesCancelled((prev) => ({
                    ...prev,
                    courseSelectionChangesCancelled: false,
                  }));
                }, changesCancelledTimeout);
              }}
              isSaved={changesSaved.courseSelectionChangesSaved}
              isCancelled={changesCancelled.courseSelectionChangesCancelled}
              programId={program.id}
              onCoursesChange={fetchProgram}
              teacherId={program.teacher.id}
            />
            <Divider />

            {/* Course Details (use the selected course) */}
            {selectedCourse && (
              <div
                className={css({
                  display: 'flex',
                  flexDir: 'column',
                  gap: '24px',
                  padding: '24px 16px 16px 16px',
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
                    gap: '4px',
                  })}
                >
                  <div
                    className={css({
                      textStyle: 'subheading5',
                      color: 'yellow50',
                    })}
                  >
                    COURSE{' '}
                    {String(selectedCourse.course_number).padStart(2, '0')}
                  </div>
                  <div
                    className={css({
                      textStyle: 'subheading3',
                      color: 'yellow100',
                    })}
                  >
                    {selectedCourse.name}
                  </div>
                </div>

                {/* Course Details */}
                <CourseDetailsSection
                  course={selectedCourse}
                  isEditing={editState.isEditingCourseDetails}
                  onEdit={
                    isAuthorized
                      ? () => toggleEditState('isEditingCourseDetails')
                      : undefined
                  }
                  onSave={() => {
                    setChangesSaved((prev) => ({
                      ...prev,
                      courseDetailsChangesSaved: true,
                    }));
                    setTimeout(() => {
                      setChangesSaved((prev) => ({
                        ...prev,
                        courseDetailsChangesSaved: false,
                      }));
                      setEditState((prev) => ({
                        ...prev,
                        isEditingCourseDetails: false,
                      }));
                    }, changesSavedTimeout);
                    fetchProgram();
                  }}
                  onCancel={() => {
                    setChangesCancelled((prev) => ({
                      ...prev,
                      courseDetailsChangesCancelled: true,
                    }));
                    setTimeout(() => {
                      setChangesCancelled((prev) => ({
                        ...prev,
                        courseDetailsChangesCancelled: false,
                      }));
                      setEditState((prev) => ({
                        ...prev,
                        isEditingCourseDetails: false,
                      }));
                    }, changesCancelledTimeout);
                  }}
                  isSaved={changesSaved.courseDetailsChangesSaved}
                  isCancelled={changesCancelled.courseDetailsChangesCancelled}
                  changesSavedTimeout={changesSavedTimeout}
                  changesCancelledTimeout={changesCancelledTimeout}
                />

                {/* Course Timeslots */}
                <CourseTimeslotsSection
                  course={selectedCourse}
                  isEditing={editState.isEditingCourseTimeslots}
                  onEdit={() => toggleEditState('isEditingCourseTimeslots')}
                  onSave={() => {
                    setChangesSaved((prev) => ({
                      ...prev,
                      courseTimeslotsChangesSaved: true,
                    }));
                    setTimeout(() => {
                      setChangesSaved((prev) => ({
                        ...prev,
                        courseTimeslotsChangesSaved: false,
                      }));
                      setEditState((prev) => ({
                        ...prev,
                        isEditingCourseTimeslots: false,
                      }));
                    }, changesSavedTimeout);
                    fetchProgram();
                  }}
                  onCancel={() => {
                    setChangesCancelled((prev) => ({
                      ...prev,
                      courseTimeslotsChangesCancelled: true,
                    }));
                    setTimeout(() => {
                      setChangesCancelled((prev) => ({
                        ...prev,
                        courseTimeslotsChangesCancelled: false,
                      }));
                      setEditState((prev) => ({
                        ...prev,
                        isEditingCourseTimeslots: false,
                      }));
                    }, changesCancelledTimeout);
                  }}
                  isSaved={changesSaved.courseTimeslotsChangesSaved}
                  isCancelled={changesCancelled.courseTimeslotsChangesCancelled}
                  teacherId={program.teacher.id}
                />

                {/* Course Objectives */}
                <CourseObjectivesSection
                  course={selectedCourse}
                  isEditing={editState.isEditingCourseObjectives}
                  onEdit={() => toggleEditState('isEditingCourseObjectives')}
                  onSave={async () => {
                    await fetchProgram();
                    toggleEditState('isEditingCourseObjectives');
                    setSaveConfirmation({
                      ...saveConfirmation,
                      courseObjectivesSaved: true,
                    });
                    setTimeout(
                      () =>
                        setSaveConfirmation({
                          ...saveConfirmation,
                          courseObjectivesSaved: false,
                        }),
                      changesSavedTimeout
                    );
                  }}
                  onCancel={() => {
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
                  }}
                  isSaved={saveConfirmation.courseObjectivesSaved}
                  isCancelled={
                    changesCancelled.courseObjectivesChangesCancelled
                  }
                  teacherId={program.teacher.id}
                />

                {/* Credentials & Experience */}
                <CourseCredentialsSection
                  course={selectedCourse}
                  isEditing={editState.isEditingCredentialsExperience}
                  onEdit={() =>
                    toggleEditState('isEditingCredentialsExperience')
                  }
                  onSave={() => {
                    toggleEditState('isEditingCredentialsExperience');
                    setChangesSaved((prev) => ({
                      ...prev,
                      credentialsExperienceChangesSaved: true,
                    }));
                    setTimeout(() => {
                      setChangesSaved((prev) => ({
                        ...prev,
                        credentialsExperienceChangesSaved: false,
                      }));
                    }, changesSavedTimeout);
                    fetchProgram();
                  }}
                  onCancel={() => {
                    toggleEditState('isEditingCredentialsExperience');
                    setChangesCancelled((prev) => ({
                      ...prev,
                      credentialsExperienceChangesCancelled: true,
                    }));
                    setTimeout(() => {
                      setChangesCancelled((prev) => ({
                        ...prev,
                        credentialsExperienceChangesCancelled: false,
                      }));
                    }, changesCancelledTimeout);
                  }}
                  isSaved={changesSaved.credentialsExperienceChangesSaved}
                  isCancelled={
                    changesCancelled.credentialsExperienceChangesCancelled
                  }
                  teacherId={program.teacher.id}
                />

                {/* Course Materials */}
                <CourseMaterialsSection
                  course={selectedCourse}
                  isEditing={editState.isEditingCourseMaterials}
                  onEdit={() => toggleEditState('isEditingCourseMaterials')}
                  onSave={() => {
                    setChangesSaved((prev) => ({
                      ...prev,
                      courseMaterialsChangesSaved: true,
                    }));
                    setTimeout(() => {
                      setChangesSaved((prev) => ({
                        ...prev,
                        courseMaterialsChangesSaved: false,
                      }));
                    }, changesSavedTimeout);
                    toggleEditState('isEditingCourseMaterials');
                  }}
                  onCancel={() => {
                    setChangesCancelled((prev) => ({
                      ...prev,
                      courseMaterialsChangesCancelled: true,
                    }));
                    setTimeout(() => {
                      setChangesCancelled((prev) => ({
                        ...prev,
                        courseMaterialsChangesCancelled: false,
                      }));
                    }, changesCancelledTimeout);
                    toggleEditState('isEditingCourseMaterials');
                  }}
                  isSaved={changesSaved.courseMaterialsChangesSaved}
                  isCancelled={changesCancelled.courseMaterialsChangesCancelled}
                  onRefresh={fetchProgram}
                  teacherId={program.teacher.id}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
