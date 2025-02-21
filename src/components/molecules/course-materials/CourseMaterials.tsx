import ButtonLarge from '@repo/components/atoms/buttons/ButtonLarge';
import TileButton from '@repo/components/atoms/buttons/TileButton';
import { Divider } from '@repo/components/atoms/divider';
import Download from '@repo/components/atoms/download/Download';
import { Delete, Upload } from '@repo/components/atoms/icons';
import { useEffect, useRef, useState } from 'react';
import { css } from '../../../../styled-system/css';

interface CourseMaterial {
  name: string;
  file_url: string;
}

interface PendingMaterial {
  file: File;
  previewUrl: string;
  name: string;
  file_url: string;
}

interface CourseMaterialsProps {
  materials: CourseMaterial[];
  isEditing: boolean;
  onStateChange?: (
    materials: (CourseMaterial | PendingMaterial)[] | null
  ) => void;
  onEdit?: () => void;
  isAuthorized?: boolean;
}

const CourseMaterials = ({
  materials,
  isEditing,
  onStateChange,
  onEdit,
  isAuthorized = false,
}: CourseMaterialsProps) => {
  console.log('[CourseMaterials] Received materials:', materials);

  const [currentMaterials, setCurrentMaterials] =
    useState<CourseMaterial[]>(materials);
  const [pendingMaterials, setPendingMaterials] = useState<PendingMaterial[]>(
    []
  );
  const [hasDeletedFiles, setHasDeletedFiles] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previousMaterialsRef = useRef<string>();
  const initialMaterialsRef = useRef<number>(0);

  // Set initial materials count when component mounts or materials prop changes
  useEffect(() => {
    if (!isEditing) {
      initialMaterialsRef.current = materials.length;
    }
  }, [materials, isEditing]);

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      pendingMaterials.forEach((material) => {
        URL.revokeObjectURL(material.previewUrl);
      });
    };
  }, [pendingMaterials]);

  // Reset state when materials prop changes
  useEffect(() => {
    console.log('[CourseMaterials] Materials prop changed:', {
      materials,
      currentMaterials,
      isEditing,
      initialMaterialsCount: initialMaterialsRef.current,
    });

    // Always update current materials when materials prop changes
    setCurrentMaterials(materials);

    // Clear pending materials when materials prop changes
    setPendingMaterials([]);
  }, [materials]);

  // Reset hasDeletedFiles when materials prop changes
  useEffect(() => {
    setHasDeletedFiles(false);
  }, [materials]);

  // Notify parent of state changes
  useEffect(() => {
    if (!isEditing || !onStateChange) return;

    // Create a stable representation of the current state for comparison
    const currentStateKey = JSON.stringify([
      ...currentMaterials.map((m) => ({ name: m.name, file_url: m.file_url })),
      ...pendingMaterials.map((m) => ({ name: m.file.name })),
    ]);

    // Only notify if the state has actually changed
    if (currentStateKey !== previousMaterialsRef.current) {
      previousMaterialsRef.current = currentStateKey;

      // Combine current and pending materials for parent component
      const allMaterials = [
        ...currentMaterials,
        ...pendingMaterials.map((pending) => ({
          name: pending.file.name,
          file_url: pending.previewUrl,
          file: pending.file,
        })),
      ];

      // Deduplicate materials based on name
      const uniqueMaterials = allMaterials.reduce(
        (acc: (CourseMaterial | PendingMaterial)[], curr) => {
          if (!acc.some((m) => m.name === curr.name)) {
            acc.push(curr);
          }
          return acc;
        },
        []
      );

      console.log(
        '[CourseMaterials] Notifying parent of changes:',
        uniqueMaterials
      );
      onStateChange(uniqueMaterials.length > 0 ? uniqueMaterials : null);
    }
  }, [currentMaterials, pendingMaterials, isEditing, onStateChange]);

  useEffect(() => {
    // Set hasDeletedFiles to true if all files have been marked for deletion
    // This happens when user clicks delete icons, before actual saving
    const hasNoFiles =
      currentMaterials.length === 0 && pendingMaterials.length === 0;
    const hadInitialFiles = initialMaterialsRef.current > 0;

    console.log('[CourseMaterials] Checking delete state:', {
      hasNoFiles,
      hadInitialFiles,
      currentMaterialsLength: currentMaterials.length,
      pendingMaterialsLength: pendingMaterials.length,
      initialMaterialsCount: initialMaterialsRef.current,
    });

    setHasDeletedFiles(hasNoFiles && hadInitialFiles);
  }, [currentMaterials, pendingMaterials]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    console.log('[CourseMaterials] Files selected:', {
      count: files.length,
      files: Array.from(files).map((f) => ({
        name: f.name,
        type: f.type,
        size: f.size,
      })),
    });

    // Create a Set of existing file names to check for duplicates
    const existingFileNames = new Set([
      ...currentMaterials.map((m) => m.name),
      ...pendingMaterials.map((m) => m.name),
    ]);

    const newPendingMaterials: PendingMaterial[] = [];
    const errors: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check for duplicates
      if (existingFileNames.has(file.name)) {
        errors.push(`File "${file.name}" already exists`);
        continue;
      }

      // Check file size (max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      if (file.size > maxSize) {
        errors.push(`File "${file.name}" exceeds 10MB limit`);
        continue;
      }

      // Check if file is a valid type
      const validTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'image/gif',
      ];
      if (!validTypes.includes(file.type)) {
        errors.push(
          `File "${file.name}" is not a valid type (PDF or image files only)`
        );
        continue;
      }

      const previewUrl = URL.createObjectURL(file);
      newPendingMaterials.push({
        file,
        previewUrl,
        name: file.name,
        file_url: previewUrl,
      });
      existingFileNames.add(file.name);
    }

    // Show any errors that occurred
    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (newPendingMaterials.length > 0) {
      console.log(
        '[CourseMaterials] Adding new pending materials:',
        newPendingMaterials
      );
      setPendingMaterials((prev) => [...prev, ...newPendingMaterials]);
    }

    // Reset file input
    event.target.value = '';
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeletePending = (index: number) => {
    console.log('[CourseMaterials] Deleting pending material:', {
      index,
      material: pendingMaterials[index],
      currentPendingCount: pendingMaterials.length,
      currentMaterialsCount: currentMaterials.length,
    });

    const materialToDelete = pendingMaterials[index];
    URL.revokeObjectURL(materialToDelete.previewUrl);

    const newPendingMaterials = pendingMaterials.filter((_, i) => i !== index);
    setPendingMaterials(newPendingMaterials);
  };

  const handleDelete = (index: number) => {
    console.log('[CourseMaterials] Deleting current material:', {
      index,
      material: currentMaterials[index],
      currentMaterialsCount: currentMaterials.length,
      pendingCount: pendingMaterials.length,
    });

    const newMaterials = [...currentMaterials];
    newMaterials.splice(index, 1);
    setCurrentMaterials(newMaterials);

    if (onStateChange) {
      onStateChange(newMaterials);
    }
  };

  // Show "no data" container for unauthorized users when there are no materials
  if (
    !currentMaterials.length &&
    !pendingMaterials.length &&
    !isEditing &&
    !isAuthorized
  ) {
    return (
      <div
        className={css({
          w: '100%',
          h: '128px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px',
          borderWidth: '1px',
          borderStyle: 'dashed',
          borderColor: 'yellow20',
          borderRadius: '16px',
          bg: 'transparent',
          padding: '24px',
        })}
      >
        <div className={css({ textStyle: 'subheading5', color: 'yellow80' })}>
          No Course Materials Available
        </div>
        <div
          className={css({
            textStyle: 'paragraph2',
            color: 'yellow50',
            textAlign: 'center',
          })}
        >
          The teacher hasn't uploaded any course materials yet
        </div>
      </div>
    );
  }

  // Show TileButton in empty state when not editing for authorized users
  if (
    !currentMaterials.length &&
    !pendingMaterials.length &&
    !isEditing &&
    isAuthorized
  ) {
    return (
      <TileButton
        title="Add Course Materials"
        subtitle="Upload documents, presentations, and resources for your students"
        className={css({
          borderRadius: '16px',
        })}
        onClick={onEdit}
      />
    );
  }

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        w: '100%',
      })}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        multiple
      />

      {currentMaterials.length > 0 || pendingMaterials.length > 0 ? (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          })}
        >
          {/* Existing Materials */}
          {currentMaterials.map((material, index) => (
            <div
              key={`existing-${index}`}
              className={css({
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px',
                w: '100%',
              })}
            >
              <div className={css({ flex: 1 })}>
                <Download
                  filename={material.name}
                  file_url={material.file_url}
                  isEditing={isEditing}
                />
              </div>
              {isEditing && (
                <Delete
                  className={css({
                    stroke: 'red50',
                    w: '20px',
                    h: '20px',
                    cursor: 'pointer',
                    _hover: { stroke: 'red100' },
                  })}
                  onClick={() => handleDelete(index)}
                />
              )}
            </div>
          ))}

          {/* Pending Materials */}
          {pendingMaterials.map((material, index) => (
            <div
              key={`pending-${index}`}
              className={css({
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px',
                w: '100%',
                bg: 'yellow10',
                p: '8px',
                borderRadius: '8px',
              })}
            >
              <div className={css({ flex: 1 })}>
                <Download
                  filename={material.file.name}
                  file_url={material.previewUrl}
                  isEditing={isEditing}
                />
              </div>
              <Delete
                className={css({
                  stroke: 'red50',
                  w: '20px',
                  h: '20px',
                  cursor: 'pointer',
                  _hover: { stroke: 'red100' },
                })}
                onClick={() => handleDeletePending(index)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className={css({
            w: '100%',
            p: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: '1px',
            borderColor: 'yellow20',
            borderRadius: '20px',
            bg: 'yellow5',
          })}
        >
          <div className={css({ textStyle: 'paragraph1', color: 'yellow50' })}>
            {hasDeletedFiles ||
            (materials.length > 0 && currentMaterials.length === 0)
              ? 'All course materials have been removed.'
              : 'No course materials have been uploaded yet.'}
          </div>
        </div>
      )}

      {isEditing && (
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          })}
        >
          <Divider />

          <ButtonLarge
            onClick={handleUploadClick}
            className={css({
              whiteSpace: 'nowrap',
              w: '100%',
              gap: '8px',
              px: '24px',
            })}
          >
            Upload File
            <div
              className={css({
                w: '24px',
                h: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              })}
            >
              <Upload
                className={css({
                  w: '100%',
                  h: '100%',
                  stroke: 'currentColor',
                  fill: 'none',
                })}
              />
            </div>
          </ButtonLarge>
        </div>
      )}
    </div>
  );
};

export default CourseMaterials;
