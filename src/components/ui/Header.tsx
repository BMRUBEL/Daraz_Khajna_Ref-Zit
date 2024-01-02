import { authKey } from "@/constants/storageKey";
import { removeUserInfo } from "@/services/auth.service";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, MenuProps, Select, Space } from "antd";
import Avatar from "antd/es/avatar/avatar";
import { useRouter } from "next/navigation";
import { useState } from "react";
const { Header: AntHeader } = Layout;

const onChange = (value: string) => {
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log("search:", value);
};

const customStyles = {
  color: "white",
  cursor: "pointer",
  padding: "1px",
};
// Filter `option.label` match the user type `input`
const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);

  // const { role } = getUserInfo() as any;
  // console.log(role);
  const role = "super_admin";
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/super_admin/receive");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text">
          Profile
        </Button>
      ),
    },
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text">
          Password
        </Button>
      ),
    },
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];

  return (
    <AntHeader
      style={{
        backgroundColor: "#ff5100",
        paddingLeft: "0px",
      }}
    >
      <div className="flex items-center  justify-between pl-2">
        <div className="flex items-center justify-start pl-0">
          <MenuOutlined
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            style={customStyles}
            className="text-2xl mr-3"
          />
          <p
            style={{
              fontSize: "16px",
              marginLeft: "8px",
              color: "white",
              fontWeight: "bold",
            }}
            className="uppercase items-center"
          >
            Branch:{" "}
            <span className="bg-white  text-primary text-xs font-medium mr-2 px-2.5 py-1.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
              Daraz Bangladesh
            </span>
          </p>
        </div>

        <div>
          <span
            style={{
              fontSize: "16px",
              color: "white",
              fontWeight: "bold",
            }}
            className="uppercase"
          >
            Store :{" "}
          </span>
          <Select
            style={{
              width: "250px",
            }}
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            defaultValue="Central Store"
            options={[
              {
                value: "Central Store",
                label: "Central Store",
              },
              {
                value: "Chottogram Hub",
                label: "Chottogram Hub",
              },
              {
                value: "Source Center",
                label: "Source Center",
              },
              {
                value: "Tajwar Center,Dhaka",
                label: "Tajwar Center,Dhaka",
              },
            ]}
          />
        </div>
        <div style={{
          display:"flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "5px"
        }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span className="text-white text-base font-bold">{"John Doe"}</span>
            <span className="text-white text-sm">{"Admin"}</span>
          </div>

          <Dropdown menu={{ items }}>
            <a href="">
              {" "}
              <Space wrap size={24}>
                <Avatar size="large" icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
