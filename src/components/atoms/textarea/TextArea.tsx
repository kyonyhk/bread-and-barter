import React, { useState } from 'react';
import { css } from '../../../../styled-system/css';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export default function TextArea({ className, ...props }: TextAreaProps) {
  const [text, setText] = useState('');

  return (
    <textarea
      className={`${css({
        textStyle: 'paragraph1',
        w: '100%',
        h: '100%',
        minH: '96px',
        bg: 'yellow5',
        borderWidth: '1px',
        borderColor: 'yellow20',
        borderRadius: 'md',
        px: '4',
        py: '2',
        color: 'yellow100',
        resize: 'none',
        _focus: {
          outline: 'none',
          borderColor: 'yellow50',
          ring: '1px',
          ringColor: 'yellow50',
        },
        _placeholder: {
          color: 'yellow20',
        },
      })} ${className}`}
      {...props}
    />
  );
}
