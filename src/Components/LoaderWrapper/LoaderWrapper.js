import Loader from '../Loader/Loader';

export const LoaderWrapper = ({
  loading,
  children,
  LoaderElement = Loader,
}) => {
  return loading ? <LoaderElement /> : children;
};

export default LoaderWrapper;
