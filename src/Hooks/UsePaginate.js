import { useMemo, useState } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/minimal.css';

export const usePaginate = (totalPages) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pagination = useMemo(
    () => (
      <ResponsivePagination
        current={currentPage}
        total={totalPages}
        onPageChange={setCurrentPage}
      />
    ),
    [currentPage, totalPages, setCurrentPage]
  );

  const result = { currentPage, pagination };

  return Object.assign(result, { currentPage, pagination });
};

export default usePaginate;
