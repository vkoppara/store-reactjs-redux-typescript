import React from "react";

const Input: React.FC<{
  name: string;
  label: string;
  value: string;
  error: string;
  onChange: () => void;
}> = ({ name, label, value, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        autoFocus
        value={value}
        id={name}
        name={name}
        type="text"
        className="form-control"
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
