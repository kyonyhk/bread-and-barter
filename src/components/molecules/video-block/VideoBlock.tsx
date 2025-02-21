import { Avatar } from '@repo/components/atoms/avatar';
import Link from 'next/link';
import { ReactNode } from 'react';
import { css } from '../../../../styled-system/css';
import { HStack, VStack } from '../../../../styled-system/jsx';

interface VideoBlockProps {
  children?: ReactNode;
  title: string;
  subtitle: string;
  programId: string;
  imageUrl: string;
}

export default function VideoBlock({
  title,
  subtitle,
  programId,
  imageUrl,
  children,
}: VideoBlockProps) {
  return (
    <Link href={`/programs/${programId}`}>
      <div
        className={css({
          w: '100%',
          h: '100%',
          minH: '620px',
          borderRadius: '40px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          bgImage: `url(${imageUrl})`,
          bgPosition: 'center',
          bgSize: 'cover',
          position: 'relative',
          overflow: 'hidden',
          zIndex: 0,
          cursor: 'pointer',
        })}
      >
        {/* Container Border */}
        <div
          className={css({
            w: '100%',
            h: '100%',
            minH: '620px',
            borderWidth: '1px',
            borderColor: 'yellow20',
            borderRadius: '40px',
            transform: 'translate(-20px, 20px)',
            position: 'absolute',
            zIndex: 2,
            _hover: {
              bg: 'yellow5',
            },
          })}
        ></div>

        {/* Top Shade */}
        <div
          className={css({
            w: '100%',
            h: '100%',
            minH: '620px',
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.40) 5.48%, rgba(0, 0, 0, 0.00) 19.12%)',
            position: 'absolute',
            zIndex: 1,
            transform: 'translate(-20px, 0px)',
            borderRadius: '40px',
          })}
        ></div>

        {/* Bottom Shade */}
        <div
          className={css({
            w: '100%',
            h: '100%',
            minH: '620px',
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 58.61%, rgba(0, 0, 0, 0.60) 86.59%)',
            position: 'absolute',
            zIndex: 1,
            transform: 'translate(-20px, 20px)',
            borderRadius: '40px',
          })}
        ></div>

        {/* Container for Program Info */}
        <VStack
          className={css({
            gap: '8px',
            position: 'relative',
            zIndex: 2,
            alignItems: 'flex-start',
          })}
        >
          {/* Program Title + Teacher Info */}
          <HStack>
            <Avatar
              name={subtitle}
              src="/images/profile-pic.png"
              className={css({ textStyle: 'subheading3' })}
            />
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                alignItems: 'flex-start',
              })}
            >
              <div
                className={css({
                  textStyle: 'subheading3',
                  color: 'yellow100',
                })}
              >
                {title}
              </div>
              <div
                className={css({
                  textStyle: 'subheading5',
                  color: 'yellow80',
                })}
              >
                {subtitle}
              </div>
            </div>
          </HStack>
        </VStack>
      </div>
    </Link>
  );
}
