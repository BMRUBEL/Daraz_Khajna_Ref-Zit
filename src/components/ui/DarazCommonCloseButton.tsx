import { Button } from "antd";
import React from "react";

const DarazCommonCloseButton = ({ children, className, color }: any) => {

  return (
    <button
      className={`text-white py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#cf1322] bg-[#f5222d] cursor-pointer focus:outline-none font-medium text-sm text-center border-none ${className}`}
    >
      <p>{children}</p>
    </button>
  );
};

export default DarazCommonCloseButton;
