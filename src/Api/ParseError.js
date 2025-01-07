export const ParseApiError = (payload, setFieldError) => {
  const parsedPayload = payload.data.data || {};

  Object.keys(parsedPayload).forEach((element) => {
    setFieldError(element, parsedPayload[element]);
  });
};

export default ParseApiError;
