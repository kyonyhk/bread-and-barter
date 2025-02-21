import { useAuth } from '@repo/app/auth/AuthContext';
import { supabase } from '@repo/lib/supabase';
import { Course } from '@repo/types/course';
import { CourseSectionProps } from '@repo/types/courseSection';
import { useEffect, useState } from 'react';
import CourseAccordion from '../course-accordion/CourseAccordion';
import CourseMaterials from './CourseMaterials';

interface CourseMaterial {
  name: string;
  file_url: string;
}

interface PendingMaterial extends CourseMaterial {
  file: File;
}

interface CourseMaterialsSectionProps extends CourseSectionProps {
  course: Course;
  onStateChange?: (materials: any) => void;
  onRefresh?: () => Promise<void>;
  teacherId?: string;
}

export default function CourseMaterialsSection({
  course,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  isSaved,
  isCancelled,
  onStateChange,
  onRefresh,
  teacherId,
}: CourseMaterialsSectionProps) {
  const { user } = useAuth();
  console.log('[CourseMaterialsSection] Received course data:', {
    courseId: course.id,
    courseMaterials: course.course_materials,
  });

  // Check if user is authorized (teacher or admin)
  const isAuthorized =
    user && (user.id === teacherId || user.user_metadata?.is_admin === true);

  const [hasChanges, setHasChanges] = useState(false);
  const [currentMaterials, setCurrentMaterials] = useState<CourseMaterial[]>(
    course.course_materials || []
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [pendingMaterials, setPendingMaterials] = useState<PendingMaterial[]>(
    []
  );

  // Reset state when course changes or editing mode is cancelled
  useEffect(() => {
    console.log('[CourseMaterialsSection] Course or editing state changed:', {
      courseId: course.id,
      isEditing,
      currentMaterials: course.course_materials,
    });

    // Always update current materials when course changes
    setCurrentMaterials(course.course_materials || []);

    if (!isEditing) {
      setHasChanges(false);
      setUploadError(null);
      setPendingMaterials([]);
    }
  }, [course.course_materials, isEditing]);

  const handleStateChange = (materials: any) => {
    console.log('[CourseMaterialsSection] State change received:', materials);
    if (materials) {
      // Deduplicate materials based on name
      const uniqueMaterials = materials.reduce(
        (acc: CourseMaterial[], curr: CourseMaterial) => {
          if (!acc.some((m) => m.name === curr.name)) {
            acc.push(curr);
          }
          return acc;
        },
        []
      );

      setCurrentMaterials(uniqueMaterials);
      setHasChanges(true);
      setUploadError(null);
      onStateChange?.(uniqueMaterials);
    }
  };

  const handleSave = async () => {
    setIsUploading(true);
    setUploadError(null);

    try {
      console.log('[CourseMaterialsSection] Starting save process...');

      const {
        data: { session },
      } = await supabase.auth.getSession();

      // Get the list of files that were removed
      const removedMaterials = course.course_materials.filter(
        (material) =>
          !currentMaterials.some((m) => m.file_url === material.file_url)
      );

      // Delete removed files from storage
      for (const material of removedMaterials) {
        try {
          // Extract file path from the URL
          const filePath = material.file_url.includes(
            '/storage/v1/object/public/course-materials/'
          )
            ? material.file_url.split(
                '/storage/v1/object/public/course-materials/'
              )[1]
            : material.file_url.split('course-materials/')[1];

          if (!filePath) {
            console.error(
              '[CourseMaterialsSection] Could not extract file path from URL:',
              material.file_url
            );
            continue;
          }

          console.log('[CourseMaterialsSection] Attempting to delete file:', {
            originalUrl: material.file_url,
            parsedPath: filePath,
          });

          // Delete file using the API endpoint
          const deleteResponse = await fetch('/api/storage/delete', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              filePath: decodeURIComponent(filePath),
              bucket: 'course-materials',
            }),
          });

          if (!deleteResponse.ok) {
            const errorData = await deleteResponse.json();
            console.error('[CourseMaterialsSection] Error deleting file:', {
              error: errorData,
              filePath,
            });
            throw new Error(`Failed to delete file: ${errorData.message}`);
          }

          const data = await deleteResponse.json();
          console.log('[CourseMaterialsSection] File deletion result:', {
            filePath,
            success: true,
            data,
          });
        } catch (error) {
          console.error(
            '[CourseMaterialsSection] Error processing file deletion:',
            {
              file: material.file_url,
              error,
            }
          );
          throw error;
        }
      }

      // Filter out materials that need to be uploaded (have a File object)
      const materialsToUpload = currentMaterials.filter(
        (m): m is PendingMaterial => 'file' in m
      );
      const existingMaterials = currentMaterials.filter((m) => !('file' in m));

      console.log('[CourseMaterialsSection] Materials to process:', {
        toUpload: materialsToUpload,
        existing: existingMaterials,
      });

      // Upload new files
      const uploadedMaterials = await Promise.all(
        materialsToUpload.map(async (material) => {
          try {
            const formData = new FormData();
            formData.append('file', material.file);
            formData.append('courseId', course.id);

            console.log('[CourseMaterialsSection] Uploading file:', {
              name: material.name,
              type: material.file.type,
              size: material.file.size,
              courseId: course.id,
            });

            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error(
                '[CourseMaterialsSection] Upload error:',
                errorData
              );
              throw new Error(
                `Failed to upload ${material.name}: ${response.statusText}`
              );
            }

            const data = await response.json();
            console.log('[CourseMaterialsSection] Upload successful:', data);
            return {
              name: data.name,
              file_url: data.file_url,
            };
          } catch (error) {
            console.error(
              `[CourseMaterialsSection] Error uploading ${material.name}:`,
              error
            );
            throw error;
          }
        })
      );

      // Combine existing and newly uploaded materials
      const allMaterials = [...existingMaterials, ...uploadedMaterials];

      console.log(
        '[CourseMaterialsSection] Updating course with materials:',
        allMaterials
      );

      // Update course with all materials
      const response = await fetch(`/api/courses/${course.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_materials: allMaterials.map((material) => ({
            name: material.name,
            file_url: material.file_url,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          '[CourseMaterialsSection] API error response:',
          errorData
        );
        throw new Error(
          errorData.details || errorData.error || 'Failed to update materials'
        );
      }

      const responseData = await response.json();
      console.log('[CourseMaterialsSection] Save successful:', responseData);

      // Update the current materials with the saved data
      setCurrentMaterials(responseData.course_materials || []);
      setPendingMaterials([]); // Clear pending materials after successful save
      setHasChanges(false);
      setIsUploading(false);

      // Refresh the course data to get updated materials
      if (onRefresh) {
        await onRefresh();
      }

      // Call onSave to exit edit mode
      onSave();
    } catch (error) {
      console.error('[CourseMaterialsSection] Error saving materials:', error);
      setUploadError(
        error instanceof Error ? error.message : 'Failed to save materials'
      );
      setIsUploading(false);
      throw error;
    }
  };

  const handleCancel = () => {
    setCurrentMaterials(course.course_materials || []);
    setHasChanges(false);
    setUploadError(null);
    onCancel();
  };

  return (
    <CourseAccordion
      title="Course Materials"
      initialExpanded={false}
      isEditing={isEditing}
      onEdit={isAuthorized ? onEdit : undefined}
      onSave={handleSave}
      onCancel={handleCancel}
      isSaved={isSaved}
      isCancelled={isCancelled}
      hasChanges={hasChanges}
      isLoading={isUploading}
      error={uploadError}
    >
      <CourseMaterials
        materials={currentMaterials}
        isEditing={isEditing}
        onStateChange={handleStateChange}
        onEdit={isAuthorized ? onEdit : undefined}
      />
    </CourseAccordion>
  );
}
