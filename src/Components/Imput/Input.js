import { ErrorMessage } from 'formik';

export const Input = ({
  name,
  type,
  label,
  error,
  required = false,
  onChange = () => {},
}) => {
  return (
    <div className="my-4 flex flex-col">
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

      <ErrorMessage
        name={name}
        component="span"
        className="text-red-600 my-1"
      />
    </div>
  );
};
