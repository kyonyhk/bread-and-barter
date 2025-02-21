import React from 'react';
import { css } from 'styled-system/css';

interface DropdownProps {
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`${css({
        w: '100%',
        h: '40px',
        bg: 'yellow5',
        borderWidth: '1px',
        borderColor: 'yellow20',
        borderRadius: '20px',
        padding: '8px 16px',
        color: 'altyellow',
      })} ${className}`}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
