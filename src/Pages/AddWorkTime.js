import WorkTimeForm from '../Froms/WorkTimeForm';
import useAxios from 'axios-hooks';
import LoaderWrapper from '../Components/LoaderWrapper/LoaderWrapper';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import config from '../Api/ApiConfig';

export const AddWorkTime = ({ mode = 'add' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [isDeleting, setIsDeleting] = useState(false);
  const [workTimes, setWorkTimes] = useState([]);
  const [currentWorkTime, setCurrentWorkTime] = useState({});

  const [{ data, loading, error }] = useAxios({
    url: `/api/work-time?ticket=${mode === 'add' ? id : state.ticket.id}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    setWorkTimes(data?.data || []);
  }, [data]);

  useEffect(() => {
    setCurrentWorkTime(state || {});
  }, [state]);

  const handleDelete = useCallback(async (id) => {
    setIsDeleting(true);
    await config.delete(`/api/work-time/${id}`);
    setWorkTimes((prevState) =>
      [...prevState].filter((element) => element.id !== id)
    );
    setIsDeleting(false);
  }, []);

  const [
    { loading: createEditWorkTimeLoading, error: createEditWorkTimeError },
    executeCreateEditWorkTimeLoading,
  ] = useAxios(
    {
      url: `/api/work-time/${mode === 'add' ? '' : state.id}`,
      method: mode === 'add' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true }
  );

  return (
    <div className="flex justify-center p-10 ">
      <div className="border border-gray-500 p-5 w-2/3 rounded-md relative bg-[#f6f7f9] min-h-[600px]">
        <LoaderWrapper
          loading={loading || isDeleting || createEditWorkTimeLoading}
        >
          <WorkTimeForm
            ticketId={id}
            setWorkTimes={setWorkTimes}
            handleSubmit={executeCreateEditWorkTimeLoading}
            mode={mode}
            workTime={mode === 'edit' && currentWorkTime}
          />
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
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
      </div>
    </div>
  );
};

export default AddWorkTime;
