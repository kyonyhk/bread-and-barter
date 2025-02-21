import { css } from '../../../../styled-system/css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div
      className={css({ display: 'flex', flexDirection: 'column', gap: '2' })}
    >
      <label
        className={css({
          textStyle: 'paragraph1',
          color: 'yellow100',
        })}
      >
        {label}
      </label>
      <input
        className={css({
          px: '4',
          py: '2',
          borderWidth: '1px',
          borderColor: error ? 'red50' : 'yellow20',
          borderRadius: 'md',
          textStyle: 'paragraph1',
          color: 'yellow100',
          _focus: {
            outline: 'none',
            borderColor: error ? 'red50' : 'yellow50',
            ring: '1px',
            ringColor: error ? 'red50' : 'yellow50',
          },
          _placeholder: {
            color: 'yellow20',
          },
        })}
        {...props}
      />
      {error && (
        <div
          className={css({ color: 'red50', textStyle: 'paragraph2', mt: '1' })}
        >
          {error}
        </div>
      )}
    </div>
  );
}
