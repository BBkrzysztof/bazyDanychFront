import useAxios from 'axios-hooks';
import { useMemo } from 'react';

import ErrorWrapper from '../Components/ErrorWrapper/ErrorWrapper';
import TicketCard from '../Components/TicketCard/TicketCard';
import LoaderWrapper from '../Components/LoaderWrapper/LoaderWrapper';

export const Main = () => {
  const [{ data, loading, error }] = useAxios('/api/ticket');

  const tickets = useMemo(() => {
    return data?.data?.map((ticket) => {
      return <TicketCard ticket={ticket} key={ticket.id} />;
    });
  }, [data]);

  return (
    <ErrorWrapper error={error}>
      <LoaderWrapper loading={loading}>
        <div className="mx-auto w-1/2 h-max p-4">{tickets}</div>
      </LoaderWrapper>
    </ErrorWrapper>
  );
};

export default Main;
