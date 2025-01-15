import TicketForm from '../Froms/TicketForm';
import { useLocation } from 'react-router-dom';

export const EditTicket = () => {
  const { state } = useLocation();

  return <TicketForm mode="edit" ticket={state} />;
};

export default EditTicket;
