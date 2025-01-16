import useAxios from 'axios-hooks';
import usePaginate from '../Hooks/UsePaginate';
import { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import ErrorWrapper from '../Components/ErrorWrapper/ErrorWrapper';
import LoaderWrapper from '../Components/LoaderWrapper/LoaderWrapper';
import TagForm from '../Froms/TagForm';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Table from '../Components/Table/Table';
import config from '../Api/ApiConfig';

export const Tags = ({ mode = 'add' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [pages, setPages] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tags, setTags] = useState([]);

  const { currentPage, pagination } = usePaginate(pages);

  const [{ data, loading, error }] = useAxios({
    url: '/api/tag/',
    params: { limit: 10, page: currentPage },
  });

  useEffect(() => {
    setPages(data?.pages || 1);
  }, [setPages, data]);

  useEffect(() => {
    setTags(data?.data || []);
  }, [data]);

  const [
    { loading: createEditTagLoading, error: createEditTagError },
    createEditTagExecute,
  ] = useAxios(
    {
      url: `/api/tag/${mode === 'add' ? '' : state.id}`,
      method: mode === 'add' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true }
  );

  const handleDelete = useCallback(async (id) => {
    setIsDeleting(true);
    await config.delete(`/api/work-time/${id}`);
    setTags((prevState) =>
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
            navigate(`/tags/edit/${element.id}`, {
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
    <div className="flex justify-center p-10 ">
      <div className="border border-gray-500 p-5 w-2/3 rounded-md relative bg-[#f6f7f9] min-h-[600px]">
        <ErrorWrapper error={error || createEditTagError}>
          <LoaderWrapper
            loading={loading || createEditTagLoading || isDeleting}
          >
            <TagForm
              execute={createEditTagExecute}
              mode={mode}
              setTags={setTags}
              tag={mode === 'edit' ? state : {}}
            />
            <Table
              cols={[
                { label: 'Id', key: 'id' },
                { label: 'Name', key: 'name' },
              ]}
              data={tags || []}
              paginate={pagination}
              renderActions={renderActions}
            />
          </LoaderWrapper>
        </ErrorWrapper>
      </div>
    </div>
  );
};

export default Tags;
