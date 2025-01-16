import ErrorWrapper from '../Components/ErrorWrapper/ErrorWrapper';
import LoaderWrapper from '../Components/LoaderWrapper/LoaderWrapper';
import Table from '../Components/Table/Table';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePaginate from '../Hooks/UsePaginate';
import useFilters from '../Hooks/UseFilters';
import useAxios from 'axios-hooks';

export const Logs = () => {
  const [pages, setPages] = useState(1);
  const [logs, setLogs] = useState([]);
  const [firstLoading, setFirstLoading] = useState(false);

  const { currentPage, pagination } = usePaginate(pages);

  const { filtersArray, filters } = useFilters([
    { key: 'id', label: 'Id' },
    { key: 'action', label: 'Action' },
    { key: 'user', label: 'User' },
    { key: 'ticket', label: 'Ticket' },
  ]);

  const [{ data, loading, error }] = useAxios({
    url: '/api/log/',
    params: { limit: 10, ...filters, page: currentPage },
  });

  useEffect(() => {
    setPages(data?.pages || 1);
  }, [setPages, data]);

  useEffect(() => {
    setLogs(data?.data || []);

    if (data?.data) {
      setFirstLoading(false);
    }
  }, [data]);

  return (
    <div className="flex justify-center p-10 ">
      <div className="border border-gray-500 p-5 w-full lg:w-2/3 rounded-md relative bg-[#f6f7f9] min-h-[600px]">
        <ErrorWrapper error={error}>
          <LoaderWrapper loading={firstLoading}>
            <h6 className="mb-4">Logs:</h6>
            <Table
              filters={filtersArray}
              cols={[
                { key: 'id', label: 'Id' },
                { key: 'action', label: 'Action' },
                { key: 'user.email', label: 'User' },
                { key: 'ticket.id', label: 'Ticket' },
              ]}
              data={logs}
              loading={loading}
              paginate={pagination}
            />
          </LoaderWrapper>
        </ErrorWrapper>
      </div>
    </div>
  );
};
