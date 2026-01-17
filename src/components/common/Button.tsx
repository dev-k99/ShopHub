import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const classNames = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full-width' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

export default Button;