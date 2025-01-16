import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import LoaderWrapper from '../Components/LoaderWrapper/LoaderWrapper';
import ErrorWrapper from '../Components/ErrorWrapper/ErrorWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faPen,
  faTicket,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Pill from '../Components/Pill/Pill';
import moment from 'moment';
import CommentCard from '../Components/CommentCard/CommentCard';
import CommentForm from '../Components/CommentForm/CommentForm';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useUser from '../Hooks/UseUser';
import AsyncCreatableSelect from 'react-select/async-creatable';
import SelectWithOptions from '../Components/Select/SelectWihtOptions';
import { Button } from '../Components/Button/Button';
import { twMerge } from 'tailwind-merge';
import SelectWithAsyncOptions from '../Components/Select/CustomSelect';
import config from '../Api/ApiConfig';

const statusOptions = [
  { value: 'StatusNew', label: 'Status new' },
  { value: 'StatusInProgress', label: 'Status in progress' },
  { value: 'StatusInReview', label: 'Status in review' },
  { value: 'StatusClosed', label: 'Status closed' },
];

export const SingleTicket = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { isAuthenticated, hasRole } = useUser();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newEmployee, setNewEmployee] = useState('');
  const [isAssigningEmployee, setIsAssigningEmployee] = useState(false);

  const [{ data, loading, error }] = useAxios(`/api/comment/${id}`);
  const [ticket, setTicket] = useState(state);

  //@todo add create work time (employee only!)
  const [{ loading: deletingLoading, error: deletingError }, executeDelete] =
    useAxios(
      {
        url: `/api/ticket/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      { manual: true }
    );

  const [
    { loading: statusChangeLoading, error: statusChangeError },
    executeStatusChange,
  ] = useAxios(
    {
      url: `/api/ticket/status-change/${id}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true }
  );

  const [{ loading: assignLoading, error: assignError }, executeAssign] =
    useAxios(
      {
        url: `/api/ticket/assign/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      { manual: true }
    );

  useEffect(() => {
    setComments(data);
  }, [data]);

  const createComment = useMemo(() => {
    if (!isAuthenticated) return;

    return <CommentForm id={ticket.id} setComments={setComments} />;
  }, [isAuthenticated, ticket]);

  const handleDeleteTicket = useCallback(async () => {
    await executeDelete();
    navigate('/');
  }, [executeDelete, navigate]);

  const controls = useMemo(() => {
    if (!isAuthenticated) return;
    const result = [];

    result.push(
      //handle edit
      <FontAwesomeIcon
        className="cursor-pointer"
        icon={faPen}
        key={'edit'}
        onClick={() => navigate(`/ticket/edit/${id}`, { state: ticket })}
      />
    );

    if (hasRole(['RoleAdmin'])) {
      //handle ticket delete
      result.push(
        <FontAwesomeIcon
          key={'delete'}
          className="cursor-pointer"
          onClick={handleDeleteTicket}
          icon={faTrash}
        />
      );
    }

    if (hasRole(['RoleAdmin', 'RoleEmployee'])) {
      result.push(
        <FontAwesomeIcon
          key={'worktime'}
          className="cursor-pointer"
          icon={faClock}
          onClick={() => navigate(`/work-time/add/${ticket.id}`)}
        />
      );
    }

    return <>{result}</>;
  }, [handleDeleteTicket, hasRole, id, isAuthenticated, navigate, ticket]);

  const statusElement = useMemo(() => {
    return !isChangingStatus ? (
      <div onClick={() => setIsChangingStatus((prevState) => !prevState)}>
        <Pill additionalClasses="cursor-pointer" pillStyle="yellow">
          {ticket.status}
        </Pill>
      </div>
    ) : (
      <div className="flex gap-2 items-center">
        <SelectWithOptions
          containerClasses="w-1/2"
          options={statusOptions}
          onChange={({ value, label }) => {
            setNewStatus(value);
          }}
          defaultValue={{
            label: statusOptions.filter(
              ({ value, label }) => value === ticket.status
            )[0].label,
            value: ticket.status,
          }}
        />
        <Button
          onClick={() => {
            executeStatusChange({ data: { status: newStatus } });
            setTicket((prevState) => ({ ...prevState, status: newStatus }));
            setIsChangingStatus(false);
          }}
        >
          Save
        </Button>
        <Button onClick={() => setIsChangingStatus(false)}>Cancel</Button>
      </div>
    );
  }, [isChangingStatus, ticket, newStatus, executeStatusChange]);

  const fetchUsers = async () => {
    const { data: dataUsers } = await config.get(
      '/api/user?role=RoleEmployee&limit=50'
    );
    const { data: dataAdmins } = await config.get(
      '/api/user?role=RoleAdmin&limit=50'
    );
    return dataUsers.data
      .map((item) => ({
        value: item.id,
        label: item.email,
      }))
      .concat(
        dataAdmins.data.map((item) => ({
          value: item.id,
          label: item.email,
        }))
      );
  };

  const employeeElement = useMemo(() => {
    const selectedUser =
      ticket.worker?.email === undefined
        ? {}
        : {
            label: ticket.worker?.email,
            value: ticket.worker?.id,
          };

    return !isAssigningEmployee ? (
      <span
        className="text-gray-600 font-semibold cursor-pointer"
        onClick={() => setIsAssigningEmployee(true)}
      >
        Assigned to: {ticket.worker?.email || ''}
      </span>
    ) : (
      <>
        <span className="text-gray-600 font-semibold">Assigned to:</span>
        <div className="flex gap-2">
          <SelectWithAsyncOptions
            containerClasses="w-1/2"
            fetchOptions={fetchUsers}
            defaultValue={selectedUser}
            onChange={({ value, label }) => {
              setNewEmployee(value);
            }}
            isMulti={false}
          />
          <Button
            onClick={async () => {
              const { data } = await executeAssign({
                data: { worker: { id: newEmployee } },
              });

              setTicket((prevState) => ({ ...prevState, worker: data.worker }));
              setIsAssigningEmployee(false);
            }}
          >
            Save
          </Button>
          <Button onClick={() => setIsAssigningEmployee(false)}>Cancel</Button>
        </div>
      </>
    );
  }, [isAssigningEmployee, ticket, executeAssign, newEmployee]);

  return (
    <div className="flex justify-center p-10 ">
      <div className="border border-gray-500 p-5 w-full lg:w-2/3 rounded-md relative bg-[#f6f7f9] min-h-[600px]">
        <LoaderWrapper
          loading={
            !ticket ||
            loading ||
            deletingLoading ||
            statusChangeLoading ||
            assignLoading
          }
        >
          <ErrorWrapper error={error || deletingError}>
            <div className="flex flex-col gap-1">
              <div className="flex gap-3">
                <FontAwesomeIcon icon={faTicket} className="w-10 h-10" />
                <div className="flex flex-col gap-2 w-1/2">
                  <h3 className="capitalize w-full">{ticket.title}</h3>
                  <span className="text-gray-600 font-semibold">
                    Added by: {ticket.author.email},
                    <Pill>{ticket.author.role}</Pill>
                  </span>
                </div>
                <div className="flex justify-end w-full gap-5">{controls}</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 py-5 px-1">
                <div className="flex gap-1 items-center">
                  <span className="text-gray-600 font-semibold">Tags: </span>
                  {ticket.tags?.map((tag) => (
                    <Pill pillStyle="green" key={`status-pill-${id}-${tag.id}`}>
                      {tag.name}
                    </Pill>
                  ))}
                </div>
                <div
                  className={twMerge('flex', isChangingStatus && 'flex-col')}
                >
                  <span className="text-gray-600 font-semibold">Status: </span>
                  {statusElement}
                </div>
                <div>
                  <span className="text-gray-600 font-semibold">
                    Created at:
                  </span>
                  <Pill pillStyle="default">
                    {moment(ticket.createdAt.date).format('Y-M-d')}
                  </Pill>
                </div>
                <div>{employeeElement}</div>
                <div>
                  <span className="text-gray-600 font-semibold">
                    Last update:
                  </span>
                  <Pill pillStyle="default">
                    {moment(ticket.updatedAt.date).format('Y-M-d')}
                  </Pill>
                </div>
              </div>
              <hr className="px-10 my-5 border-gray-500" />
              <span className="text-gray-600 font-bold">Description:</span>
              <p className="px-2">{ticket.content}</p>
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
          </ErrorWrapper>
        </LoaderWrapper>
      </div>
    </div>
  );
};

export default SingleTicket;
