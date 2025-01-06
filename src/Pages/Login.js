import { Input } from '../Components/Imput/Input';
import { Form, Formik } from 'formik';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Components/Button/Button';

export const Login = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = useCallback((event, { setSubmitting }) => {
    setSubmitting(false);
    console.log(event);
  }, []);

  return (
    <div className="flex w-full h-[100vh] justify-center items-center bg-[#f3f4f7]">
      <div className="w-1/4 p-5 h-[50vh] bg-white rounded-xl shadow-lg shadow-gray-50/200 flex items-center flex-col">
        <h5 className="">Welcome back</h5>
        <span className="">Please enter your details to sing in</span>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
      </div>
    </div>
  );
};

export default Login;
