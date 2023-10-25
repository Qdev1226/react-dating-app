import React from "react";
import PropTypes from "prop-types";

const SelectElement = ({
  name,
  id,
  placeholder,
  required,
  options,
  handleChange,
}) => {
  return (
    <div className='pb-2 pt-4'>
      <select
        name={name}
        id={id}
        required={required}
        onChange={handleChange}
        className='block w-full p-4 text-lg rounded-sm bg-black'
      >
        <option value=''>{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

SelectElement.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  required: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelectElement;
