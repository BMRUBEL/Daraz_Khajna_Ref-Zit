import Link from "next/link";
import { Button } from "antd";

const DarazCommonRedirectButton = ({ children, className, color, to }: any) => {
  return (

    <Link
      href={to}
      className={`text-white py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#363434] bg-[#b9aba4] cursor-pointer focus:outline-none font-medium text-sm text-center border-none ${className}`}
    >
      <p>{children}</p>
    </Link>


  );
};

export default DarazCommonRedirectButton;
