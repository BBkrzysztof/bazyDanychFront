import useAxios from 'axios-hooks';
import { useMemo } from 'react';

import ErrorWrapper from '../Components/ErrorWrapper/ErrorWrapper';
import TicketCard from '../Components/TicketCard/TicketCard';
import LoaderWrapper from '../Components/LoaderWrapper/LoaderWrapper';
import useFilters from '../Hooks/UseFilters';

export const Main = () => {
  const { filtersComponent, filters } = useFilters([
    { key: 'title', label: 'Title' },
    { key: 'content', label: 'Content' },
    { key: 'status', label: 'Status' },
  ]);

  const [{ data, loading, error }] = useAxios({
    url: '/api/ticket',
    params: filters,
  });

  const tickets = useMemo(() => {
    return data?.data?.map((ticket) => {
      return <TicketCard ticket={ticket} key={ticket.id} />;
    });
  }, [data]);

  return (
    <div className="mx-auto w-2/3 border border-gray-500 min-h-[1000px]">
      <div className="p-5 border-b border-gray-500 flex gap-2">
        {filtersComponent}
      </div>
      <ErrorWrapper error={error}>
        <LoaderWrapper loading={loading}>
          <div className="mx-auto w-2/3 h-max p-4">{tickets}</div>
        </LoaderWrapper>
      </ErrorWrapper>
    </div>
  );
};

export default Main;
