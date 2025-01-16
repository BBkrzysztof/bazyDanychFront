import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import config from '../Api/ApiConfig';

import { Input } from '../Components/Imput/Input';
import SelectWithAsyncOptions from '../Components/Select/CustomSelect';
import { Button } from '../Components/Button/Button';
import { useCallback, useMemo } from 'react';
import useAxios from 'axios-hooks';
import { useNavigate } from 'react-router-dom';

export const TicketForm = ({ mode = 'add', ticket = {} }) => {
  const navigate = useNavigate();

  const initialValues = {
    title: mode === 'add' ? '' : ticket.title,
    content: mode === 'add' ? '' : ticket.content,
    tags: mode === 'add' ? [] : ticket.tags,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
    tags: Yup.array(),
  });

  const fetchOptions = async () => {
    const { data } = await config.get('/api/tag?limit=100');
    return data.data.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  };

  const defaultTags = useMemo(() => {
    if (mode === 'add') return [];

    return ticket?.tags?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [mode, ticket]);

  const [{ loading, error }, execute] = useAxios(
    {
      url: `/api/ticket/${mode === 'add' ? '' : ticket.id}`,
      method: mode === 'add' ? 'POST' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    { manual: true }
  );

  const handleSubmit = useCallback(async (payload) => {
    const { data } = await execute({
      data: payload,
    });

    navigate(`/ticket/${data.id}`, { state: data });
  }, []);

  return (
    <div className="flex justify-center p-10 ">
      <div className="border border-gray-500 p-5 w-full lg:w-2/3 rounded-md relative bg-[#f6f7f9] min-h-[600px]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, isSubmitting, values }) => {
            return (
              <Form className="flex flex-col gap-2 h-full">
                <div className="flex flex-col gap-2">
                  <span className="text-gray-600 font-semibold">Title: </span>
                  <Input
                    type={'title'}
                    name={'title'}
                    label={'title'}
                    value={values.title}
                    onChange={(value) => setFieldValue('title', value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-600 font-semibold">
                    Description:
                  </span>
                  <textarea
                    className="w-full h-full resize-none h-52 focus:outline-none p-1"
                    placeholder="Content ..."
                    onChange={(event) =>
                      setFieldValue('content', event.target.value)
                    }
                    value={values.content}
                  ></textarea>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-gray-600 font-semibold">Tags:</span>
                  <SelectWithAsyncOptions
                    fetchOptions={fetchOptions}
                    defaultValue={defaultTags}
                    onChange={(data) => {
                      setFieldValue(
                        'tags',
                        data?.map(({ value }) => ({ id: value }))
                      );
                    }}
                  />
                </div>
                <Button type="submit" disabled={!!isSubmitting}>
                  Save
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default TicketForm;
