import { Button } from "antd";
import React from "react";
import Link from "next/link";
const DarazCommonAddButton = ({ children, className, color, to }: any) => {

  return (

    <Link
      href={to}
      className={`text-white py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#ff3300] bg-[#FF5100] cursor-pointer focus:outline-none font-medium text-sm text-center border-none ${className}`}
    >
      <p>{children}</p>
    </Link>

  );
};

export default DarazCommonAddButton;
