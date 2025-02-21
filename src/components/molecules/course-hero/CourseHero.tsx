import { Avatar } from '@repo/components/atoms/avatar';
import { Play, Plus } from '@repo/components/atoms/icons';
import { useRef, useState } from 'react';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from '../../../../styled-system/css';

interface CourseHeroProps {
  teacherName: string;
  courseName: string;
  bgVideo?: string;
  teacherProfilePic: string;
  onUploadComplete?: (url: string) => void;
  isCreating?: boolean;
}

export default function CourseHero({
  teacherName,
  courseName,
  bgVideo,
  teacherProfilePic,
  onUploadComplete,
  isCreating = false,
}: CourseHeroProps) {
  const hasMedia =
    !!bgVideo && (!isCreating || !bgVideo.includes('default-course'));
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image or video
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      alert('Please select an image or video file');
      return;
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      alert('File size should be less than 10MB');
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUploadComplete?.(data.url);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
      // Reset the input
      event.target.value = '';
    }
  };

  if (!hasMedia) {
    return (
      <>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*,video/*"
          onChange={handleFileChange}
          className={css({
            display: 'none',
          })}
        />
        <button
          onClick={handleUploadClick}
          disabled={isUploading}
          className={css({
            w: '100%',
            h: '540px',
            borderRadius: '40px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bg: 'black',
            border: '1px dashed token(colors.yellow50)',
            cursor: isUploading ? 'not-allowed' : 'pointer',
            gap: '8px',
            position: 'relative',
            transition: 'all 0.2s ease-in-out',
            opacity: isUploading ? 0.7 : 1,
            _hover: !isUploading
              ? {
                  bg: 'yellow10',
                  '& .upload-text': {
                    color: 'yellow80',
                  },
                }
              : undefined,
          })}
        >
          <div
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              w: '48px',
              h: '48px',
            })}
          >
            <Plus
              className={css({
                w: '40px',
                h: '40px',
                fill: 'yellow50',
              })}
            />
          </div>
          <div className={css({ display: 'flex', flexDirection: 'column' })}>
            <div
              className={
                css({
                  color: 'yellow100',
                  textStyle: 'subheading4',
                }) + ' upload-text'
              }
            >
              {isUploading ? 'Uploading...' : 'Add photo or video'}
            </div>
            <div
              className={css({ textStyle: 'paragraph1', color: 'yellow50' })}
            >
              Some photos or your course
            </div>
          </div>
        </button>
      </>
    );
  }

  return (
    <div
      className={css({
        w: '100%',
        h: '540px',
        borderRadius: '40px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundImage: bgVideo ? `url(${bgVideo})` : 'none',
        backgroundColor: !bgVideo ? 'black' : 'transparent',
        bgPosition: 'center',
        bgSize: 'cover',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 0,
      })}
    >
      {/* Container Border */}
      <div
        className={css({
          w: '100%',
          h: '100%',
          borderWidth: '1px',
          borderColor: 'yellow20',
          borderRadius: '40px',
          transform: 'translate(-20px, 20px)',
          position: 'absolute',
          zIndex: 2,
        })}
      ></div>

      {/* Top Shade */}
      <div
        className={css({
          w: '100%',
          h: '100%',
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.40) 5.48%, rgba(0, 0, 0, 0.00) 19.12%)',
          position: 'absolute',
          zIndex: 1,
          transform: 'translate(-20px, 20px)',
        })}
      ></div>

      {/* Bottom Shade */}
      <div
        className={css({
          w: '100%',
          h: '100%',
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 58.61%, rgba(0, 0, 0, 0.60) 86.59%)',
          position: 'absolute',
          zIndex: 1,
          transform: 'translate(-20px, 20px)',
        })}
      ></div>

      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 2,
        })}
      >
        {/* Container for Profile Photo + Description */}
        <VStack
          className={css({
            gap: '4px',
            position: 'relative',
            zIndex: 2,
            alignItems: 'flex-start',
          })}
        >
          {/* Profile Avatar + Course Name + Teacher Name */}
          <HStack>
            <Avatar
              name={teacherName}
              src={teacherProfilePic}
              className={css({ textStyle: 'subheading3' })}
            />
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '0px',
                alignItems: 'flex-start',
              })}
            >
              <div
                className={css({
                  textStyle: 'subheading3',
                  color: 'yellow100',
                })}
              >
                {courseName}
              </div>
              <div
                className={css({ textStyle: 'paragraph1', color: 'yellow80' })}
              >
                {teacherName}
              </div>
            </div>
          </HStack>
        </VStack>
        {hasMedia && (
          <Play
            className={css({
              fill: 'yellow100',
              w: '40px',
              h: '40px',
              cursor: 'pointer',
              _hover: { strokeWidth: '2px' },
            })}
          />
        )}
      </div>
    </div>
  );
}
