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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/list" element={<Loader />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
