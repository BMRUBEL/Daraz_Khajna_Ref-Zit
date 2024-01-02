import React from "react";

const CheckboxHeader = ({ label, checked, onChange }) => (
  <>
    <th className="px-2 py-2">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {label}
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-indigo-600 ml-2"
          checked={checked}
          onChange={onChange}
        />
      </div>
    </th>
  </>
);

export default CheckboxHeader;
