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

export const WorkTime = () => {
  const [pages, setPages] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [workTimes, setWorkTimes] = useState([]);

  const navigate = useNavigate();

  const { currentPage, pagination } = usePaginate(pages);

  const [{ data, loading, error }] = useAxios({
    url: '/api/work-time/',
    params: { limit: 50, page: currentPage },
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

  return (
    <div className="flex justify-center p-10 ">
      <div className="p-5 w-2/3  relative bg-[#f6f7f9] min-h-[800px]">
        <ErrorWrapper error={error}>
          <LoaderWrapper loading={loading || isDeleting}>
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">
                    Ticket
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">
                    User
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">
                    Date:
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">
                    Hours:
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-gray-600 font-medium">
                    Actions:
                  </th>
                </tr>
              </thead>
              <tbody>
                {workTimes.map((element) => (
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-gray-800">
                      {element.ticket.id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-800">
                      {element.employee.email}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-800">
                      {moment(element.createdAt.date).format('YYYY-MM-DD')}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-800">
                      {element.hours}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-gray-800">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </LoaderWrapper>
          {pagination}
        </ErrorWrapper>
      </div>
    </div>
  );
};

export default WorkTime;
