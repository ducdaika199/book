import React from 'react';
import classNames from 'classnames';

interface Props {
  selected: boolean;
  color?: 'primary' | 'secondary' | 'default';
  disabled?: boolean;
}

const Cycle = ({ selected, color = 'default', disabled = false }: Props) => {
  const commonStyles = classNames({
    'fill-gray-300': disabled,
    'fill-primary': color === 'primary' && selected,
    'fill-secondary': color === 'secondary' && selected,
    'fill-default': color === 'default' && selected,
  });

  const inCycleStyles = classNames(
    `w-6 h-6 inline-block text-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-150 ${commonStyles}`,
    {
      'w-6 h-6': selected,
      'w-0 h-0 fill-white': !selected,
    },
  );

  return (
    <span className="relative w-6 h-6 inline-flex justify-center items-center">
      <svg
        className={`w-6 h-6 inline-block text-md ${commonStyles}`}
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="RadioButtonUncheckedIcon"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
      </svg>

      <svg
        className={inCycleStyles}
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 24 24"
        data-testid="RadioButtonCheckedIcon"
      >
        <path d="M8.465 8.465C9.37 7.56 10.62 7 12 7C14.76 7 17 9.24 17 12C17 13.38 16.44 14.63 15.535 15.535C14.63 16.44 13.38 17 12 17C9.24 17 7 14.76 7 12C7 10.62 7.56 9.37 8.465 8.465Z"></path>
      </svg>
    </span>
  );
};

export default Cycle;
