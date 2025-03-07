import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ResetPassword from './Pages/ResetPassword';
import ProtectedRoute from './Pages/ProtectedRoute/ProtectedRoute';
import Loader from './Components/Loader/Loader';
import Logout from './Pages/Logout';
import { ToastContainer } from 'react-toastify';
import Main from './Pages/Main';
import Layout from './Layout/Layout';
import SingleTicket from './Pages/SingleTicket';
import CreateTicket from './Pages/CreateTicket';
import EditTicket from './Pages/EditTicket';
import AddWorkTime from './Pages/AddWorkTime';
import WorkTime from './Pages/WorkTime';
import ProtectedRoleRoute from './Pages/ProtectedRoute/ProtectedRoleRoute';
import Tags from './Pages/Tags';
import Users from './Pages/Users';
import EditUser from './Pages/EditUser';
import { Logs } from './Pages/Logs';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/ticket/:id" element={<SingleTicket />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/ticket/add" element={<CreateTicket />} />
              <Route path="/ticket/edit/:id" element={<EditTicket />} />

              <Route path="/list" element={<Loader />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="reset-password" element={<ResetPassword />} />

              <Route path="/profile" element={<EditUser />} />

              <Route
                element={
                  <ProtectedRoleRoute roles={['RoleAdmin', 'RoleEmployee']} />
                }
              >
                <Route path="/work-time/add/:id" element={<AddWorkTime />} />
                <Route path="/work-time/" element={<WorkTime />} />
                <Route
                  path="/work-time/edit/:id"
                  element={<AddWorkTime mode="edit" />}
                />
              </Route>

              <Route
                element={
                  <ProtectedRoleRoute roles={['RoleAdmin', 'RoleEmployee']} />
                }
              >
                <Route path="/tags/" element={<Tags />} />
                <Route path="/users/" element={<Users />} />
                <Route
                  path="/users/edit/:id"
                  element={<EditUser profile={false} />}
                />
                <Route path="/tags/edit/:id" element={<Tags mode="edit" />} />
              </Route>
              <Route element={<ProtectedRoleRoute roles={['RoleAdmin']} />}>
                <Route path="/logs" element={<Logs />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
