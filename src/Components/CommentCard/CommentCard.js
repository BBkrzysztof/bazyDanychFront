import moment from 'moment/moment';
import useAxios from 'axios-hooks';
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useUser from '../../Hooks/UseUser';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import LoaderWrapper from '../LoaderWrapper/LoaderWrapper';
import { twMerge } from 'tailwind-merge';
import CommentForm from '../CommentForm/CommentForm';

export const CommentCard = ({
  id,
  content,
  author,
  createdAt,
  setComments,
}) => {
  const { user } = useUser();

  const [isEditing, setIsEditing] = useState(false);

  //@todo add edit comment if author === me or admin
  const [{ loading }, executeDelete] = useAxios(
    {
      url: `/api/comment/${id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true }
  );

  const handleDelete = useCallback(async () => {
    await executeDelete();
    setComments((prevState) => {
      const newState = [...prevState];

      return newState.filter((element) => element.id !== id);
    });
  }, [executeDelete, setComments, id]);

  return !isEditing ? (
    <div className={twMerge('border border-gray-500 ', loading && 'p-1')}>
      <LoaderWrapper loading={loading}>
        <div className="p-1 border-b border-gray-500 flex justify-between bg-[#f3f4f7]">
          <span className="text-gray-600 font-semibold">
            Commented by: {author.email}
          </span>
          <div className="flex gap-2 items-center">
            {user &&
              (user?.role !== 'RoleUser' || user?.email === author.email) && (
                <>
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    icon={faTrash}
                    onClick={() => handleDelete()}
                  />
                  <FontAwesomeIcon
                    className="cursor-pointer"
                    icon={faPen}
                    onClick={() => setIsEditing((prevState) => !prevState)}
                  />
                </>
              )}
            <span className="text-gray-600 font-semibold">
              created: {moment(createdAt.date).format('Y-M-D')}
            </span>
          </div>
        </div>
        <div className="px-1 py-2">{content}</div>
      </LoaderWrapper>
    </div>
  ) : (
    <CommentForm
      id={id}
      setComments={setComments}
      comment={content}
      setIsEditing={setIsEditing}
    />
  );
};

export default CommentCard;
