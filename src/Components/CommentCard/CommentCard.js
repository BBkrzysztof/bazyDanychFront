import moment from 'moment/moment';

export const CommentCard = ({ id, content, author, createdAt }) => {
  //@todo add edit comment if author === me or admin

  return (
    <div className="border border-gray-500">
      <div className="p-1 border-b border-gray-500 flex justify-between bg-[#f3f4f7]">
        <span className="text-gray-600 font-semibold">
          Commented by: {author.email}
        </span>
        <span className="text-gray-600 font-semibold">
          created: {moment(createdAt.date).format('Y-M-d')}
        </span>
      </div>
      <div className="px-1 py-2">{content}</div>
    </div>
  );
};

export default CommentCard;
