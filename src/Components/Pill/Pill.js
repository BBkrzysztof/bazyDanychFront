import { twMerge } from 'tailwind-merge';

export const Pill = ({ additionalClasses, children, pillStyle = 'purple' }) => {
  const styles = {
    default:
      'bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded',
    red: 'bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded',
    green:
      'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded',
    yellow:
      'bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded',
    purple:
      'bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded',
  };

  return (
    <span
      className={twMerge(
        styles[pillStyle],
        ' text-center truncate max-w-32 ',
        additionalClasses
      )}
    >
      {children}
    </span>
  );
};

export default Pill;
