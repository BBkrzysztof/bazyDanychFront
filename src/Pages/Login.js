import { Input } from '../Components/Imput/Input';
import { Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Components/Button/Button';
import Loader from '../Components/Loader/Loader';
import axios from '../Api/ApiConfig';
import useUser from '../Hooks/UseUser';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

export const Login = () => {
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
    async (data, { setSubmitting }) => {
      setIsLoading(true);
      setError('');
      try {
        const result = await axios.post('/api/login', JSON.stringify(data));
        login(result.data);
      } catch (e) {
        toast('Something went wrong!', { type: 'error' });

        if (e.status === 401) {
          setError(e.response.data.data);
        }
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
    [login]
  );

  return (
    <div className="flex w-full h-[100vh] justify-center items-center bg-[#f3f4f7]">
      <div className="w-1/4 p-5 h-[50vh] bg-white rounded-xl shadow-lg shadow-gray-50/200 flex items-center flex-col">
        <h5 className="">Welcome back</h5>
        <span className="">Please enter your details to sing in</span>
        {isLoading ? (
          <Loader />
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, isSubmitting }) => {
              return (
                <Form className="flex flex-col h-full ">
                  <Input
                    type={'email'}
                    name={'email'}
                    label={'Email'}
                    onChange={(value) => setFieldValue('email', value)}
                  />
                  <Input
                    type={'password'}
                    name={'password'}
                    label={'Password'}
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
            }}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Login;
