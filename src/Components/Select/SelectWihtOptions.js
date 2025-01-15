import React from 'react';
import Select from 'react-select';

const SelectWithOptions = ({
  options,
  defaultValue,
  onChange,
  containerClasses,
  isMulti = false,
}) => {
  return (
    <Select
      options={options}
      defaultValue={defaultValue}
      onChange={onChange}
      isMulti={isMulti}
      className={containerClasses}
      getOptionLabel={(e) => e.label}
      getOptionValue={(e) => e.value}
    />
  );
};

export default SelectWithOptions;
