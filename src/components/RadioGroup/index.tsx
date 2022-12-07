import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import Cycle from './Cycle';

interface RadioGroupProps {
  direction?: 'row' | 'col';
  children: React.ReactNode;
  className?: string;
}

interface RadioProps {
  value: string;
  label: string;
  color?: 'primary' | 'secondary' | 'default';
  className?: string;
  disabled?: boolean;
}

interface ContextState {
  selected: string;
  updateSelected: (value: string) => void;
}

const RadioContext = createContext({} as ContextState);

const RadioGroup = ({
  children,
  direction = 'col',
  className = '',
}: RadioGroupProps) => {
  const [selected, setSelected] = useState('');

  const divStyles = classNames(`flex gap-2 flex-wrap ${className}`, {
    'flex-col items-start': direction === 'col',
  });

  const updateSelected = useCallback(
    (value: string) => {
      setSelected(value);
    },
    [setSelected],
  );

  const value = useMemo(
    () => ({
      selected,
      updateSelected,
    }),
    [selected, updateSelected],
  );

  return (
    <RadioContext.Provider value={value}>
      <div className={divStyles}>{children}</div>
    </RadioContext.Provider>
  );
};

const useRadioContext = () => useContext(RadioContext);

const Radio = ({
  value,
  label,
  color,
  disabled = false,
  className = '',
}: RadioProps) => {
  const { selected, updateSelected } = useRadioContext();

  const labelStyles = classNames(
    `inline-flex justify-center items-center ${className}`,
    {
      'cursor-pointer': !disabled,
      'text-gray-300': disabled,
    },
  );

  const handleChangeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      updateSelected(e.target.id);
    }
  };

  return (
    <label className={labelStyles}>
      <span className="w-6 h-6 shrink-0 flex items-center justify-center mr-1">
        <input
          type="radio"
          id={`${value}`}
          checked={selected === value}
          onChange={handleChangeSelect}
          className="hidden"
        />

        <Cycle
          selected={value === selected}
          color={color}
          disabled={disabled}
        />
      </span>

      <span>{label}</span>
    </label>
  );
};

RadioGroup.Radio = Radio;

export default RadioGroup;
