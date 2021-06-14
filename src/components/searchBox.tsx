import React from "react";

const SearchBox: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <React.Fragment>
      {" "}
      <input
        autoFocus
        type="text"
        name="query"
        className="form-control my-2"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
      />{" "}
    </React.Fragment>
  );
};

export default SearchBox;
