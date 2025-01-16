import useAxios from 'axios-hooks';
import { useEffect, useMemo, useState } from 'react';

import ErrorWrapper from '../Components/ErrorWrapper/ErrorWrapper';
import TicketCard from '../Components/TicketCard/TicketCard';
import LoaderWrapper from '../Components/LoaderWrapper/LoaderWrapper';
import useFilters from '../Hooks/UseFilters';
import usePaginate from '../Hooks/UsePaginate';

export const Main = () => {
  const [pages, setPages] = useState(1);

  const { filtersComponent, filters } = useFilters([
    { key: 'title', label: 'Title' },
    { key: 'content', label: 'Content' },
    { key: 'status', label: 'Status' },
  ]);

  const { currentPage, pagination } = usePaginate(pages);

  const [{ data, loading, error }] = useAxios({
    url: '/api/ticket',
    params: { ...filters, limit: 5, page: currentPage },
  });

  useEffect(() => {
    setPages(data?.pages || 1);
  }, [setPages, data]);

  const tickets = useMemo(() => {
    return data?.data?.map((ticket) => {
      return <TicketCard ticket={ticket} key={ticket.id} />;
    });
  }, [data]);

  return (
    <div className="mx-auto w-full flex flex-col-reverse md:flex-col p-4 md:w-2/3">
      <div className="p-5 mx-auto w-2/2 flex flex-col justify-center gap-2 md:flex-row md:w-full">
        <span className="text-gray-600 font-semibold">Filters:</span>
        {filtersComponent}
      </div>
      <ErrorWrapper error={error}>
        <LoaderWrapper loading={loading}>
          <div className="mx-auto w-full h-max p-4 flex flex-col gap-2 md:w-2/3">
            {tickets}
          </div>
          <div>{pagination}</div>
        </LoaderWrapper>
      </ErrorWrapper>
    </div>
  );
};

export default Main;
