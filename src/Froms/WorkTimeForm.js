import * as Yup from 'yup';
import { Input } from '../Components/Imput/Input';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { Button } from '../Components/Button/Button';
import { useCallback, useMemo } from 'react';

export const WorkTimeForm = ({
  ticketId,
  handleSubmit,
  setWorkTimes,
  workTime = {},
  mode = 'add',
}) => {
  const maxDate = moment().format('YYYY-MM-DD');

  console.log(workTime);

  const initialValues = useMemo(
    () => ({
      createdAt:
        mode === 'add'
          ? ''
          : moment(workTime.createdAt.date).format('YYYY-MM-DD'),
      time: mode === 'add' ? '' : workTime.hours,
    }),
    [mode, workTime]
  );

  const validationSchema = Yup.object({
    createdAt: Yup.date()
      .max(new Date(maxDate), `Date cant be into the future`)
      .required('created At is required'),
    time: Yup.number().min(0).max(24).required('Time is required'),
  });

  const submit = useCallback(
    async (data, { setSubmitting }) => {
      const { response } = await handleSubmit({
        data: {
          ...data,
          ...(mode === 'add' && { ticket: { id: ticketId } }),
        },
      });
      setSubmitting(false);
      if (mode === 'edit') {
        setWorkTimes((prevState) =>
          [...prevState].filter((element) => element.id !== response.data.id)
        );
      }
      setWorkTimes((prevState) => [...prevState, response.data]);
    },
    [handleSubmit, mode, setWorkTimes, ticketId]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submit}
      enableReinitialize
    >
      {({ setFieldValue, isSubmitting, values }) => (
        <Form className="flex flex-col gap-2 h-fit py-10">
          <h4 className="capitalize">{mode} work time</h4>
          <div className="flex flex-col gap-2">
            <span className="text-gray-600 font-semibold">Time: </span>
            <Input
              type={'number'}
              name={'time'}
              label={'Time'}
              value={values.time}
              onChange={(value) => setFieldValue('time', value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-600 font-semibold">Created at: </span>
            <Input
              type={'date'}
              name={'createdAt'}
              label={'createdAt'}
              max={maxDate}
              value={values.createdAt}
              onChange={(value) => setFieldValue('createdAt', value)}
            />
          </div>
          <Button type="submit" disabled={!!isSubmitting}>
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default WorkTimeForm;
