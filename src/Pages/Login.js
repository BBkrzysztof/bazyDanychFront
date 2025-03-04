import { Input } from '../Components/Imput/Input';
import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Components/Button/Button';
import Loader from '../Components/Loader/Loader';
import axios from '../Api/ApiConfig';
import useUser from '../Hooks/UseUser';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ParseApiError from '../Api/ParseError';

export const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    email: Yup.string()
      .email('Email is incorrect')
      .required('Email is required'),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useUser();

  const onSubmit = useCallback(
    async (data, { setSubmitting, setFieldError }) => {
      setIsLoading(true);
      setError('');
      try {
        const result = await axios.post('/api/login', JSON.stringify(data));
        login(result.data);
        navigate('/');
      } catch (e) {
        toast('Something went wrong!', { type: 'error' });

        if (e.status === 401) {
          setError(e.response.data.data);
        }

        if (e.status === 400) {
          ParseApiError(e.response, setFieldError);
        }
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
    [login, navigate]
  );

  return (
    <div className="flex w-full h-[100vh] justify-center items-center bg-[#f3f4f7]">
      <div className="w-[90%] md:w-1/3 xl:w-1/4 p-5 h-[60vh] bg-white rounded-xl shadow-lg shadow-gray-50/200 flex items-center flex-col">
        <h5 className="">Welcome back</h5>
        <span className="">Please enter your details to sing in</span>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {isLoading ? (
            <Loader />
          ) : (
            ({ setFieldValue, isSubmitting, values }) => {
              return (
                <Form className="flex flex-col h-full ">
                  <Input
                    type={'email'}
                    name={'email'}
                    label={'Email'}
                    value={values.email}
                    onChange={(value) => setFieldValue('email', value)}
                  />
                  <Input
                    type={'password'}
                    name={'password'}
                    label={'Password'}
                    value={values.password}
                    onChange={(value) => setFieldValue('password', value)}
                  />
                  <Button type="submit" disabled={!!isSubmitting}>
                    Login
                  </Button>

                  <span className="my-3 text-center text-red-600">{error}</span>

                  <span className="text-center mt-auto mb-5">
                    Dont have an account ?{' '}
                    <Link className="text-purple-500" to={'/register'}>
                      Create Account
                    </Link>
                  </span>
                </Form>
              );
            }
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
