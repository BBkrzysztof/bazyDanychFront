import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

export const Button = ({
  children,
  additionalClasses = '',
  disabled = false,
  type = 'button',
  onClick = () => {},
}) => {
  const handleOnClick = useCallback(
    (event) => {
      onClick(event);
    },
    [onClick]
  );

  return (
    <button
      className={twMerge(
        'transition-all bg-purple-500 border rounded-md text-white p-1 my-1 ',
        !disabled &&
          'hover:bg-white hover:border-purple-500 hover:text-purple-500 cursor-pointer',
        'disabled:opacity-75 disabled:cursor-not-allowed',
        additionalClasses
      )}
      type={type}
      disabled={disabled}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};
