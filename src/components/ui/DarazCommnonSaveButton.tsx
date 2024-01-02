import { Button } from "antd";
import React from "react";

const DarazCommonButton = ({ children, className, color, background, onClick }: any) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`text-white py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[rgb(248,62,5)] bg-[#fd4f1a] cursor-pointer focus:outline-none font-medium text-sm text-center border-none ${className}`}
    >
      {children}
    </button>
  );
};

export default DarazCommonButton;
