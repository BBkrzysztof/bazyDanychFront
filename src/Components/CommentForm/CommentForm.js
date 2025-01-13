import useAxios from 'axios-hooks';
import { useCallback, useState } from 'react';
import { Button } from '../Button/Button';
import LoaderWrapper from '../LoaderWrapper/LoaderWrapper';

export const CommentForm = ({
  id,
  setComments,
  comment = '',
  setIsEditing = () => {},
}) => {
  const [commentContent, setCommentContent] = useState(comment);

  const [{ loading }, executePost] = useAxios(
    {
      url: `/api/comment/${id}`,
      method: comment === '' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true }
  );

  const handleSubmit = useCallback(async () => {
    const result = await executePost({
      data: {
        content: commentContent,
      },
    });

    setCommentContent('');
    if (comment === '') {
      setComments((prevState) => {
        return [...prevState, result.data];
      });
      return;
    }

    setIsEditing(false);
    setComments((prevState) => {
      const newState = prevState.filter((element) => element.id !== id);
      return [...newState, result.data];
    });
  }, [executePost, commentContent, setComments, comment, id, setIsEditing]);

  return (
    <div className="border border-gray-500">
      <div className="p-1 border-b border-gray-500 flex justify-between items-center bg-[#f3f4f7]">
        <span className="text-gray-600 font-semibold">
          {' '}
          {comment === '' ? 'Create new comment' : 'Edit comment'}
        </span>
        <Button
          disabled={loading}
          onClick={handleSubmit}
          additionalClasses="w-fit"
        >
          {comment === '' ? 'Comment' : 'Save'}
        </Button>
      </div>
      <LoaderWrapper loading={loading}>
        <textarea
          className="w-full h-full resize-none focus:outline-none p-1"
          placeholder="Comment ..."
          onChange={(event) => setCommentContent(event.target.value)}
        >
          {comment}
        </textarea>
      </LoaderWrapper>
    </div>
  );
};

export default CommentForm;
