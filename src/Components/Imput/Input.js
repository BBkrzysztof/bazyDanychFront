import { ErrorMessage } from 'formik';
import { twMerge } from 'tailwind-merge';

export const Input = ({
  name,
  type,
  label,
  error = true,
  required = false,
  onChange = () => {},
}) => {
  return (
    <div className={twMerge(' flex flex-col', error ? 'my-4' : '')}>
      <input
        className={
          'border-gray-500 rounded-md border py-1 px-3 focus:outline-purple-500'
        }
        name={name}
        type={type}
        onChange={(event) => onChange(event.target.value)}
        placeholder={label}
        required={required}
      />

      {error && (
        <ErrorMessage
          name={name}
          component="span"
          className="text-red-600 my-1"
        />
      )}
    </div>
  );
};
