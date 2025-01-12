import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export const ErrorWrapper = ({ error, children }) => {
  useEffect(() => {
    if (!error) return;

    toast('Something went wrong!', { type: 'error' });
  }, [error]);

  return error ? (
    <div className="w-full h-[100vh] bg-[#f3f4f7] flex flex-col items-center justify-center">
      <FontAwesomeIcon icon={faTriangleExclamation} className="w-60 h-60" />
      <h6 className="my-4">Something went wrong!</h6>
    </div>
  ) : (
    children
  );
};

export default ErrorWrapper;
