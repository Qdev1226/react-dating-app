import React from "react";
import PropTypes from "prop-types";

const InputElement = ({
  type,
  name,
  id,
  placeholder,
  required,
  handleChange,
}) => {
  return (
    <div className='pb-2 pt-4'>
      <input
        onChange={handleChange}
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        required={required}
        className='block w-full p-4 text-lg rounded-sm bg-black'
      />
    </div>
  );
};

InputElement.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default InputElement;
