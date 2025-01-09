import useAxios from 'axios-hooks';
import { useMemo } from 'react';
import Loader from '../Components/Loader/Loader';

import ErrorWrapper from '../Components/ErrorWrapper/ErrorWrapper';
import TicketCard from '../Components/Card/Card';

export const Main = () => {
  const [{ data, loading, error }] = useAxios('/api/ticket');

  const tickets = useMemo(() => {
    return data?.data?.map((ticket) => {
      return (
        <TicketCard
          header={ticket.title}
          content={ticket.content}
          key={ticket.id}
        />
      );
    });
  }, [data]);

  return (
    <ErrorWrapper error={error}>
      <div className="mx-auto w-1/2 h-max p-4">
        {loading ? <Loader /> : <div className="">{tickets}</div>}
      </div>
    </ErrorWrapper>
  );
};

export default Main;
