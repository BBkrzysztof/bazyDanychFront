import { useCallback, useMemo, useState } from 'react';
import { Input } from '../Components/Imput/Input';

export const useFilters = (filtersTemplate) => {
  const [filters, setFilters] = useState({});

  if (filtersTemplate?.length === undefined || filtersTemplate?.length === 0) {
    throw new Error('filtersTemplate cant be empty');
  }

  const handleFilters = useCallback(
    (key) => {
      return (value) => {
        setFilters((prevState) => {
          const newState = { ...prevState };
          newState[key] = value;
          if (value === '') {
            delete newState[key];
          }
          return newState;
        });
      };
    },
    [setFilters]
  );

  const filtersComponent = useMemo(() => {
    return (
      <>
        {filtersTemplate.map(({ key, label }) => (
          <Input
            key={`filter-element-${key}`}
            error={false}
            name={key}
            label={label}
            type="text"
            onChange={handleFilters(key)}
          />
        ))}
      </>
    );
  }, [filtersTemplate, handleFilters]);

  const filtersArray = useMemo(() => {
    return filtersTemplate.map(({ key, label }) => (
      <Input
        key={`filter-element-${key}`}
        error={false}
        name={key}
        label={label}
        type="text"
        onChange={handleFilters(key)}
      />
    ));
  }, [filtersTemplate, handleFilters]);

  const result = { filtersComponent, filtersArray, filters };

  return Object.assign(result, { filtersComponent, filtersArray, filters });
};

export default useFilters;
