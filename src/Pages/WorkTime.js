import LoaderWrapper from '../Components/LoaderWrapper/LoaderWrapper';
import moment from 'moment/moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import usePaginate from '../Hooks/UsePaginate';
import useAxios from 'axios-hooks';
import { useCallback, useEffect, useState } from 'react';
import ErrorWrapper from '../Components/ErrorWrapper/ErrorWrapper';
import { useNavigate } from 'react-router-dom';
import config from '../Api/ApiConfig';
import Table from '../Components/Table/Table';

export const WorkTime = () => {
  const [pages, setPages] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [workTimes, setWorkTimes] = useState([]);

  const navigate = useNavigate();

  const { currentPage, pagination } = usePaginate(pages);

  const [{ data, loading, error }] = useAxios({
    url: '/api/work-time/',
    params: { limit: 25, page: currentPage },
  });

  useEffect(() => {
    setWorkTimes(data?.data || []);
  }, [data]);

  useEffect(() => {
    setPages(data?.pages || 1);
  }, [setPages, data]);

  const handleDelete = useCallback(async (id) => {
    setIsDeleting(true);
    await config.delete(`/api/work-time/${id}`);
    setWorkTimes((prevState) =>
      [...prevState].filter((element) => element.id !== id)
    );
    setIsDeleting(false);
  }, []);

  const renderActions = useCallback(
    (element) => (
      <>
        <FontAwesomeIcon
          className="cursor-pointer mr-4"
          icon={faPen}
          key={'edit'}
          onClick={() =>
            navigate(`/work-time/edit/${element.id}`, {
              state: element,
            })
          }
        />
        <FontAwesomeIcon
          key={'delete'}
          className="cursor-pointer"
          onClick={() => handleDelete(element.id)}
          icon={faTrash}
        />
      </>
    ),
    [handleDelete, navigate]
  );

  return (
    <div className="flex justify-center p-10">
      <div className="p-5 w-2/3 border border-gray-500 rounded-md relative bg-[#f6f7f9] ">
        <ErrorWrapper error={error}>
          <LoaderWrapper loading={loading || isDeleting}>
            <Table
              cols={[
                { label: 'Tticket', key: 'ticket.id' },
                { label: 'User', key: 'employee.email' },
                { label: 'Date', key: 'createdAt.date' },
                { label: 'Hours', key: 'hours' },
              ]}
              data={workTimes}
              paginate={pagination}
              renderActions={renderActions}
            />
          </LoaderWrapper>
        </ErrorWrapper>
      </div>
    </div>
  );
};

export default WorkTime;
