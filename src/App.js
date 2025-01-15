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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Main />} />
            <Route path="/ticket/:id" element={<SingleTicket />} />
            <Route path="/work-time/add/:id" element={<AddWorkTime />} />
            <Route
              path="/work-time/edit/:id"
              element={<AddWorkTime mode="edit" />}
            />
            <Route path="/ticket/add" element={<CreateTicket />} />
            <Route path="/ticket/edit/:id" element={<EditTicket />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/list" element={<Loader />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="reset-password" element={<ResetPassword />} />
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
