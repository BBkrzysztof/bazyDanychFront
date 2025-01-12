import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Pill from '../Pill/Pill';

export const TicketCard = ({ ticket }) => {
  const { id, title, content, status, tags } = ticket;

  return (
    <Link
      to={`/ticket/${id}`}
      state={ticket}
      className="border-purple-500 border items-center rounded-md p-2 flex justify-around shadow-lg shadow-gray-50/200"
    >
      <div className="flex flex-col gap-1">
        <FontAwesomeIcon icon={faTicket} className="w-16 h-16" />
        <Pill>{status}</Pill>
      </div>
      <div className="flex-col w-1/2 mx-2">
        <h6>{title}</h6>
        <p className="truncate ">{content}</p>
        <div className="flex mt-3 gap-2">
          {tags?.map((tag) => (
            <Pill pillStyle="green" key={`status-pill-${id}-${tag.id}`}>
              {tag.name}
            </Pill>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default TicketCard;
