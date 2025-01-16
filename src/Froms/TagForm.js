import * as Yup from 'yup';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { Input } from '../Components/Imput/Input';
import { Button } from '../Components/Button/Button';

export const TagForm = ({ setTags, execute, mode = 'add', tag = {} }) => {
  const navigate = useNavigate();

  const initialValues = {
    name: mode === 'add' ? '' : tag.name,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
  });

  const handleSubmit = useCallback(
    async (payload, { setSubmitting }) => {
      const { data } = await execute({
        data: payload,
      });
      setSubmitting(false);
      if (mode === 'edit') {
        setTags((prevState) =>
          [...prevState].filter((element) => element.id !== data.id)
        );
      }
      setTags((prevState) => [...prevState, data]);
      navigate('/tags');
    },
    [execute, mode, navigate, setTags]
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
          <Form className="flex flex-col gap-2 w-full pb-5 mb-5 border-b border-gray-500">
            <h6 className="capitalize">{mode} tag</h6>
            <div className="flex gap-4 items-center w-full">
              <Input
                type={'name'}
                name={'name'}
                label={'Name'}
                value={values.name}
                onChange={(value) => setFieldValue('name', value)}
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

export default TagForm;
