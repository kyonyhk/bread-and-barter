import Image from 'next/image';
import { css } from '../../../../styled-system/css';
import { VStack } from '../../../../styled-system/jsx';

export default function CourseProfileTile() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '8px',
        padding: '16px',
        borderColor: 'yellow20',
        borderWidth: '1px',
        borderRadius: '30px',
        _hover: {
          bg: 'yellow10',
          borderColor: 'yellow100',
          cursor: 'pointer',
        },
      })}
    >
      <Image
        src="/images/rachel-tan.png"
        width={120}
        height={120}
        alt="Photo of Rachel Tan"
      />
      <div>
        <div className={css({ textStyle: 'subheading5', color: 'yellow100' })}>
          Pottery 101
        </div>
        <div className={css({ textStyle: 'paragraph2', color: 'yellow50' })}>
          w/ Rachel Tan
        </div>
      </div>
      <VStack className={css({ gap: '4px', alignItems: 'flex-start' })}>
        <div
          className={css({
            textStyle: 'subheading5',
            color: 'yellow80',
            textAlign: 'left`',
          })}
        >
          Dates
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '0px',
            alignItems: 'flex-start',
          })}
        >
          <div className={css({ textStyle: 'paragraph3', color: 'yellow50' })}>
            25 Oct 2024
          </div>
          <div className={css({ textStyle: 'paragraph3', color: 'yellow50' })}>
            10-11am
          </div>
        </div>
      </VStack>
    </div>
  );
}
