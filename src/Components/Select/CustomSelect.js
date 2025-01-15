import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { twMerge } from 'tailwind-merge';

const SelectWithAsyncOptions = ({
  fetchOptions,
  onChange,
  defaultValue,
  placeHolder,
  containerClasses,
  isMulti = true,
}) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOptions = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedOptions = await fetchOptions();
        setOptions(fetchedOptions);
      } catch (err) {
        console.error('Error fetching options:', err);
        setError('Failed to load options');
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [fetchOptions]);

  return (
    <div className={twMerge(containerClasses, 'm-1')}>
      {error && <div className="text-red-500">{error}</div>}
      <Select
        options={options}
        isLoading={loading}
        defaultValue={defaultValue}
        onChange={(selectedOption) => onChange(selectedOption)}
        placeholder={placeHolder}
        isClearable
        isMulti={isMulti}
      />
    </div>
  );
};

export default SelectWithAsyncOptions;
