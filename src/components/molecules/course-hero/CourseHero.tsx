import Image from 'next/image';
import { css } from '../../../../styled-system/css';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/components/atoms/avatar';

export default function CourseHero() {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        padding: '24px',
        h: '540px',
        w: '360px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'stretch',
          gap: '8px',
        })}
      >
        <Avatar>
          <AvatarImage src="https://github.com/nanopx.png" alt="@nanopx" />
          <AvatarFallback>NP</AvatarFallback>
        </Avatar>
        <div></div>
      </div>
    </div>
  );
}
