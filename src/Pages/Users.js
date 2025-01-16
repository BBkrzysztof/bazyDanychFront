import ErrorWrapper from '../Components/ErrorWrapper/ErrorWrapper';
import LoaderWrapper from '../Components/LoaderWrapper/LoaderWrapper';
import Table from '../Components/Table/Table';
import usePaginate from '../Hooks/UsePaginate';
import useAxios from 'axios-hooks';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import config from '../Api/ApiConfig';
import useFilters from '../Hooks/UseFilters';

export const Users = () => {
  const [pages, setPages] = useState(1);
  const [users, setUsers] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [firstLoading, setFirstLoading] = useState(false);

  const navigate = useNavigate();

  const { currentPage, pagination } = usePaginate(pages);

  const { filtersArray, filters } = useFilters([
    { key: 'id', label: 'Id' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
  ]);

  const [{ data, loading, error }] = useAxios({
    url: '/api/user/',
    params: { limit: 10, ...filters, page: currentPage },
  });

  useEffect(() => {
    setPages(data?.pages || 1);
  }, [setPages, data]);

  useEffect(() => {
    setUsers(data?.data || []);

    if (data?.data) {
      setFirstLoading(false);
    }
  }, [data]);

  const handleDelete = useCallback(async (id) => {
    setIsDeleting(true);
    await config.delete(`/api/user/${id}`);
    setUsers((prevState) =>
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
            navigate(`/users/edit/${element.id}`, {
              state: { user: element },
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
    <div className="flex justify-center p-10 ">
      <div className="border border-gray-500 p-5 w-full lg:w-2/3 rounded-md relative bg-[#f6f7f9] min-h-[600px]">
        <ErrorWrapper error={error}>
          <LoaderWrapper loading={firstLoading || isDeleting}>
            <h6 className="mb-4">Users:</h6>
            <Table
              filters={filtersArray}
              cols={[
                { label: 'Id', key: 'id' },
                { label: 'Email', key: 'email' },
                { label: 'Role', key: 'role' },
              ]}
              data={users}
              loading={loading}
              paginate={pagination}
              renderActions={renderActions}
            />
          </LoaderWrapper>
        </ErrorWrapper>
      </div>
    </div>
  );
};

export default Users;
