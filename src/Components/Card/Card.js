import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTicket } from '@fortawesome/free-solid-svg-icons';

export const TicketCard = ({ header, content }) => {
  return (
    <div className="border-purple-500 border items-center rounded-md p-4 flex justify-around">
      <div className="flex-col w-1/2 mx-2">
        <h6>{header}</h6>
        <p className="truncate ">{content}</p>
      </div>
      <div className="mx-2">
        <FontAwesomeIcon icon={faComments} className="w-8 h-8" />
      </div>
    </div>
  );
};

export default TicketCard;
