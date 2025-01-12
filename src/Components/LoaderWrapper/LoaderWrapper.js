import Loader from '../Loader/Loader';

export const LoaderWrapper = ({ loading, children }) => {
  return loading ? <Loader /> : children;
};

export default LoaderWrapper;
