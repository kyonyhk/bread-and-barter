import { css } from 'styled-system/css';
import { FileDownload, Folder } from '../icons';

interface DownloadProps {
  filename: string;
}

const Download = ({ filename }: DownloadProps) => {
  return (
    <div
      className={css({
        w: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        borderWidth: '1px',
        borderColor: 'yellow20',
        borderRadius: '16px',
        cursor: 'pointer',
        _hover: { bg: 'yellow20', borderColor: 'yellow50' },
      })}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        <Folder className={css({ fill: 'yellow100', w: '25px', h: '25px' })} />
        <div className={css({ textStyle: 'subheading5', color: 'altyellow' })}>
          {filename}
        </div>
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          _hover: { color: 'yellow100', fill: 'yellow100' },
        })}
      >
        <FileDownload
          className={css({
            fill: 'yellow50',
            w: '25px',
            h: '25px',
          })}
        />
        <div
          className={css({
            textStyle: 'paragraph2',
            color: 'yellow50',
          })}
        >
          Download
        </div>
      </div>
    </div>
  );
};

export default Download;
