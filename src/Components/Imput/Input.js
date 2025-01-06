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

      {error && <span className="py-2 text-red-600 font-bold">{error}</span>}
    </div>
  );
};
