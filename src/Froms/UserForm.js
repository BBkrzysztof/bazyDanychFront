import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Input } from '../Components/Imput/Input';
import { Button } from '../Components/Button/Button';
import { useCallback } from 'react';

export const UserForm = ({ user, execute }) => {
  const navigate = useNavigate();

  const initialValues = {
    email: user.email,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email')
      .required('Email is required'),
  });

  const handleSubmit = useCallback(
    async (payload, { setSubmitting }) => {
      const { data } = await execute({
        data: payload,
      });
      setSubmitting(false);
      navigate('/profile', { state: { user: data } });
    },
    [execute, navigate]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, isSubmitting, values }) => {
        return (
          <Form className="flex flex-col gap-2 w-full pt-5 mt-5 border-t border-gray-500">
            <h6>Edit {user.email}</h6>
            <div className="flex gap-4 items-center w-full">
              <Input
                type={'email'}
                name={'email'}
                label={'Email'}
                value={values.email}
                onChange={(value) => setFieldValue('email', value)}
              />
              <Button
                additionalClasses="h-fit"
                type="submit"
                disabled={!!isSubmitting}
              >
                Save
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UserForm;
