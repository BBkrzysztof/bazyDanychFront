import { useLocation } from 'react-router-dom';
import LoaderWrapper from '../Components/LoaderWrapper/LoaderWrapper';
import Pill from '../Components/Pill/Pill';
import UserForm from '../Froms/UserForm';
import useAxios from 'axios-hooks';
import ErrorWrapper from '../Components/ErrorWrapper/ErrorWrapper';
import { useEffect, useMemo, useState } from 'react';
import useUser from '../Hooks/UseUser';
import SelectWithOptions from '../Components/Select/SelectWihtOptions';
import { Button } from '../Components/Button/Button';

const roleOptions = [
  { value: 'RoleUser', label: 'Role user' },
  { value: 'RoleEmployee', label: 'Role employee' },
  { value: 'RoleAdmin', label: 'Role admin' },
];

const roleLabels = {
  RoleUser: 'Role user',
  RoleEmployee: 'Role employee',
  RoleAdmin: 'Role admin',
};

export const EditUser = ({ profile = true }) => {
  const { state } = useLocation();
  const { hasRole } = useUser();
  const [role, setNewRole] = useState('');
  const [user, setUser] = useState({});

  const [
    { loading: updateUserLoading, error: updateUserLoadingError },
    executeUpdateUser,
  ] = useAxios(
    {
      url: `/api/user/${state.user.id}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true }
  );

  const [
    { loading: updateUserRoleLoading, error: updateUserRoleError },
    executeUpdateUserRole,
  ] = useAxios(
    {
      url: `/api/user/change-role/${user.id}`,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true }
  );

  useEffect(() => {
    setUser(state.user);
  }, [state]);

  const roleContainer = useMemo(() => {
    if (!user.role) return;

    if (profile) {
      return (
        <div>
          <span className="text-gray-600 font-semibold">Role: </span>
          <Pill pillStyle="green">{user.role}</Pill>
        </div>
      );
    }

    if (hasRole(['RoleAdmin'])) {
      return (
        <div className="flex gap-2 items-center">
          <SelectWithOptions
            containerClasses="w-1/3"
            options={roleOptions}
            onChange={({ value }) => {
              setNewRole(value);
            }}
            defaultValue={{
              label: roleLabels[user.role],
              value: user.role,
            }}
          />
          <Button
            onClick={async () => {
              await executeUpdateUserRole({ data: { role: role } });
              setUser((prevState) => ({ ...prevState, role: role }));
            }}
          >
            Save
          </Button>
        </div>
      );
    }
  }, [profile, user, role, executeUpdateUserRole, hasRole]);

  return (
    <div className="flex justify-center p-10 ">
      <div className="border border-gray-500 p-5  w-full lg:w-2/3 rounded-md relative bg-[#f6f7f9] min-h-[600px]">
        <ErrorWrapper error={updateUserLoadingError || updateUserRoleError}>
          <LoaderWrapper loading={updateUserLoading || updateUserRoleLoading}>
            <h6>User:</h6>
            <div>
              <span className="text-gray-600 font-semibold">
                Email: {user.email}
              </span>
            </div>
            <div>{roleContainer}</div>
            <UserForm execute={executeUpdateUser} user={state.user} />
          </LoaderWrapper>
        </ErrorWrapper>
      </div>
    </div>
  );
};

export default EditUser;
