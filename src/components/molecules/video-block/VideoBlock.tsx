import { ReactNode } from 'react';
import { css } from '../../../../styled-system/css';
import { HStack, VStack } from '../../../../styled-system/jsx';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/components/atoms/avatar';
import Image from 'next/image';

interface VideoBlockProps {
  children: string;
  video: string;
  courseName: string;
  teacher: string;
  profilePic: string;
  genre: string;
  rating: ReactNode;
}

export default function VideoBlock({ children }: VideoBlockProps) {
  return (
    <div
      className={css({
        w: '320px',
        h: '620px',
        borderColor: 'yellow10',
        borderWidth: '1px',
        borderRadius: '40px',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        bg: 'transparent',
      })}
    >
      <Image
        src="/images/yo-yo.png"
        width={320}
        height={620}
        alt="Yoyo"
        className={css({ position: 'absolute', zIndex: -1 })}
      />
      {/* Container for Profile Photo + Description */}
      <VStack className={css({ gap: '8px' })}>
        {/* Profile Avatar + Course Name + Teacher Name */}
        <HStack>
          <Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/nanopx.png" alt="@nanopx" />
              <AvatarFallback>NP</AvatarFallback>
            </Avatar>
          </Avatar>
          <VStack
            className={css({
              gap: '4px',
              alignItems: 'flex-start',
            })}
          >
            <div
              className={css({
                textStyle: 'subheading3',
                color: 'yellow100',
              })}
            >
              Course Name
            </div>
            <div
              className={css({ textStyle: 'subheading5', color: 'yellow80' })}
            >
              Teacher Name
            </div>
          </VStack>
        </HStack>
        {/* Course Description */}
        <div className={css({ textStyle: 'paragraph1', color: 'yellow80' })}>
          Lorem ipsum dolor sit amet consectetur. Id massa donec sit turpis
          hendrerit etiam. At amet feugiat elit massa eleifend. Sem lobortis
          tempor posuere tristique pharetra magna in mi. Magna cras netus
          facilisi mattis nibh ultricies sed sed interdum.
        </div>
      </VStack>
    </div>
  );
}
