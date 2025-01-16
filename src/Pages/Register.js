import { Input } from '../Components/Imput/Input';
import { Form, Formik } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Components/Button/Button';
import Loader from '../Components/Loader/Loader';
import axios from '../Api/ApiConfig';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import ParseApiError from '../Api/ParseError';

export const Register = () => {
  const initialValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    []
  );
  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    email: Yup.string()
      .email('Email is incorrect')
      .required('Email is required'),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data, { setSubmitting, setFieldError }) => {
      setIsLoading(true);
      setError('');
      try {
        await axios.post('/api/register', JSON.stringify(data));
        toast('Account created successfully!', { type: 'success' });
        navigate('/login');
        setIsLoading(false);
      } catch (e) {
        toast('Something went wrong!', { type: 'error' });
        setIsLoading(false);

        if (e.status === 401) {
          setError(e.response.data.data);
        }
        if (e.status === 400) {
          ParseApiError(e.response, setFieldError);
        }
      } finally {
        setSubmitting(false);
      }
    },
    [navigate]
  );

  return (
    <div className="flex w-full h-[100vh] justify-center items-center bg-[#f3f4f7]">
      <div className="w-[90%] md:w-1/3 xl:w-1/4 p-5 h-[60vh] bg-white rounded-xl shadow-lg shadow-gray-50/200 flex items-center flex-col">
        <h5 className="">Create new account</h5>
        <span className="">Please enter your details to register</span>

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
                    value={values.email}
                    onChange={(value) => setFieldValue('password', value)}
                  />
                  <Button type="submit" disabled={!!isSubmitting}>
                    Register
                  </Button>

                  <span className="my-3 text-center text-red-600">{error}</span>

                  <span className="text-center mt-auto mb-5">
                    Already have an account ?{' '}
                    <Link className="text-purple-500" to={'/login'}>
                      Login
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

export default Register;
