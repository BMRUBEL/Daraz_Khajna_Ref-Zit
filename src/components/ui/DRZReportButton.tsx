import { Button } from "antd";
import Link from "next/link";
import React from "react";

const DarazReportButton = ({ children, onClick }: any) => {
  return (
    <Link
      href="#"
      onClick={onClick}
      className={`text-white shadow-md hover:shadow-md hover:bg-[#08979c] bg-[#13c2c2] cursor-pointer hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-blue-100 font-medium rounded-full text-sm px-5 py-2 text-center mr-2 mb-2  border-none`}
    >
      {children}
    </Link>
  );
};

export default DarazReportButton;
