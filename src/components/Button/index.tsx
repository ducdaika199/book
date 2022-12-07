import React from 'react';
import classnames from 'classnames';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  backgroundColor?: string;
  variant?: 'text' | 'contained' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Button = ({
  size = 'medium',
  variant = 'contained',
  backgroundColor,
  children,
  startIcon,
  endIcon,
  ...props
}: Props) => {
  const styles = classnames(
    'flex items-center shrink-0 min-w-[65px] middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-2 px-4 rounded-lg',
    {
      'bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none':
        variant === 'contained',
      'border border-blue-500 text-blue-500 hover:opacity-75 focus:ring focus:ring-blue-200':
        variant === 'outlined',
      'text-blue-500': variant === 'text',
      'text-xs': size === 'small',
      'text-xl py-3': size === 'large',
    },
  );

  return (
    <button
      type="button"
      className={styles}
      style={{ backgroundColor }}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
