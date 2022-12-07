import React from 'react';
import classnames from 'classnames';
import Image from 'next/image';

interface Props {
  variant?: 'circular' | 'rounded' | 'square';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  icon?: string;
  email?: string;
  className?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      variant = 'rounded',
      size = 'sm',
      email = '',
      icon,
      onClick,
      className = '',
    },
    ref,
  ) => {
    const styles = classnames(
      `inline-block relative cursor-pointer ${className}`,
      {
        'object-cover object-center': !!icon,
        'rounded-lg': variant === 'circular',
        'rounded-full': variant === 'rounded',
        'w-9 h-9': size === 'sm',
        'w-12 h-12': size === 'md',
        'w-[58px] h-[58px]': size === 'lg',
        'w-[74px] h-[74px]': size === 'xl',
      },
    );

    if (!icon) {
      return (
        <div
          className="inline-flex items-center cursor-pointer"
          onClick={onClick}
          ref={ref}
        >
          <span
            className={`${styles} flex items-center justify-center mr-2 bg-slate-400 font-bold text-2xl`}
          >
            {email[0]}
          </span>

          {email && <span className="font-bold text-lg">{email}</span>}
        </div>
      );
    }

    return (
      <div ref={ref}>
        <Image src={icon} alt={email} className={styles} onClick={onClick} />
      </div>
    );
  },
);

export default Avatar;
