import React, { useState } from 'react';
import { css } from 'styled-system/css';

interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  rows,
  className,
}) => {
  const [text, setText] = useState('');

  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`${css({
        w: '100%',
        h: '120px',
        padding: '16px',
        bg: 'yellow5',
        borderWidth: '1px',
        borderColor: 'yellow20',
        borderRadius: '16px',
        textStyle: 'paragraph1',
        _active: {
          borderColor: 'yellow100',
        },
        _placeholder: {
          color: 'yellow50',
        },
      })} ${className}`}
    />
  );
};

export default TextArea;
