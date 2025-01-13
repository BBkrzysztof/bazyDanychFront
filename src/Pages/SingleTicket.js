import { useLocation, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import LoaderWrapper from '../Components/LoaderWrapper/LoaderWrapper';
import ErrorWrapper from '../Components/ErrorWrapper/ErrorWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import Pill from '../Components/Pill/Pill';
import moment from 'moment';
import CommentCard from '../Components/CommentCard/CommentCard';
import CommentForm from '../Components/CommentForm/CommentForm';
import { useEffect, useMemo, useState } from 'react';
import useUser from '../Hooks/UseUser';

export const SingleTicket = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { isAuthenticated } = useUser();

  const [comments, setComments] = useState([]);

  const [{ data, loading, error }] = useAxios(`/api/comment/${id}`);

  useEffect(() => {
    setComments(data);
  }, [data]);

  const createComment = useMemo(() => {
    if (!isAuthenticated) return;

    return <CommentForm id={state.id} setComments={setComments} />;
  }, [isAuthenticated, state]);

  return (
    <LoaderWrapper loading={loading}>
      <ErrorWrapper error={error}>
        <div className="flex justify-center p-10 ">
          <div className="border border-gray-500 p-5 w-2/3 rounded-md relative bg-[#f6f7f9]">
            <div className="flex flex-col gap-1">
              <div className="flex gap-3">
                <FontAwesomeIcon icon={faTicket} className="w-10 h-10" />
                <div className="flex flex-col gap-2">
                  <h3 className="capitalize">{state.title}</h3>
                  <span className="text-gray-600 font-semibold">
                    Added by: {state.author.email},
                    <Pill>{state.author.role}</Pill>
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 py-5 px-1">
                <div className="flex gap-1 items-center">
                  <span className="text-gray-600 font-semibold">Tags: </span>
                  {state.tags?.map((tag) => (
                    <Pill pillStyle="green" key={`status-pill-${id}-${tag.id}`}>
                      {tag.name}
                    </Pill>
                  ))}
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">Status: </span>
                  <Pill pillStyle="yellow">{state.status}</Pill>
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">
                    Created at:
                  </span>
                  <Pill pillStyle="default">
                    {moment(state.createdAt.date).format('Y-M-d')}
                  </Pill>
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">
                    Assigned to: {state.worker?.email || ''}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">
                    Last update:
                  </span>
                  <Pill pillStyle="default">
                    {moment(state.updatedAt.date).format('Y-M-d')}
                  </Pill>
                </div>
              </div>
              <hr className="px-10 my-5 border-gray-500" />
              <span className="text-gray-600 font-bold">Description:</span>
              <p className="px-2">{state.content}</p>
              <hr className="px-10 my-5 border-gray-500" />
              <span className="text-gray-600 font-bold">Discussion:</span>
              <div className="flex flex-col p-2 gap-2">
                {createComment}
                {comments?.map((comment) => (
                  <CommentCard
                    {...comment}
                    setComments={setComments}
                    key={`${comment.id}-comment-card`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </ErrorWrapper>
    </LoaderWrapper>
  );
};

export default SingleTicket;
