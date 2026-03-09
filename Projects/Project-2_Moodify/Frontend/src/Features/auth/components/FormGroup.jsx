import React from "react";

const FormGroup = ({ value, onChange, label, placeholder, type }) => {
  return (
    <div className="form-group">
      <label htmlFor="label">{label}:</label>
      <input
        required
        type={type}
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FormGroup;
