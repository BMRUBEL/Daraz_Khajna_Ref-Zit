import { TableOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { USER_ROLE } from "./role";
import React from "react";

// export const sideBarItems = (role: string, sideBarData: any) => {
//   const labelStyle = { color: "white", fontWeight: "bold" };

//   function mapSidebarData(data:any, role:string) {
//     if (!data) {
//       return [];
//     }

//     return data.map((item:any) => {
//       const children = item.childs && item.childs.length > 0 ? mapSidebarData(item.childs, role) : undefined;

//       const label = item.routeUrl ? (
//         <Link href={`/${role}/${item.routeUrl}`}>
//           <span style={labelStyle}>{item.menuName}</span>
//         </Link>
//       ) : (
//         <span style={labelStyle}>{item.menuName}</span>
//       );

//       return {
//         label: label,
//         icon: undefined,
//         key: item.routeUrl || item.menuName,
//         children: children, // Only include children if they exist
//       };
//     });
//   }

//   if (role === USER_ROLE.SUPER_ADMIN) {
//     const superAdminSidebarItems: MenuProps["items"] = mapSidebarData(sideBarData, role);
//     return superAdminSidebarItems;
//   }
//   return []; // Return an empty array for other roles or handle it as needed.
// };

// // export const sideBarItems = (role: string, sideBarData: any) => {
// //   const labelStyle = { color: "white",fontWeight:"bold" };
// //   console.log(sideBarData?.map((data: any) => console.log(data?.menuName)));

// //   function mapSidebarData(data: any, role: any) {
// //     if (!data) {
// //       return [];
// //     }

// //     return data.map((item: any) => {
// //       const children = mapSidebarData(item.childs, role);

// //       const label = item.routeUrl ? (
// //         <Link href={`/${role}/${item.routeUrl}`}>
// //           <span style={labelStyle}>{item.menuName}</span>
// //         </Link>
// //       ) : (
// //         <span style={labelStyle}>{item.menuName}</span>
// //       );

// //       return {
// //         label: label,
// //         icon: undefined,
// //         key: item.routeUrl || item.menuName,
// //         children: children,
// //       };
// //     });
// //   }

// //   const superAdminSidebarItems: MenuProps["items"] =  mapSidebarData(sideBarData,role)

// //   // [
// //   //   {
// //   //     label: (
// //   //       <Link href={`/${role}/receive`}>
// //   //         <span style={labelStyle}>Receive</span>
// //   //       </Link>
// //   //     ),
// //   //     icon: <TableOutlined />,
// //   //     key: `/${role}/admin`,
// //   //   },
// //   //   {
// //   //     label: (
// //   //       <Link href={`/${role}/transaction-type`}>
// //   //         <span style={labelStyle}>Transaction</span>
// //   //       </Link>
// //   //     ),
// //   //     icon: <TableOutlined />,
// //   //     key: `/${role}/transaction-type`,
// //   //   },
// //   //   {
// //   //     label: (
// //   //       <Link href={`/${role}/local_sells`}>
// //   //         <span style={labelStyle}>Local Sells</span>
// //   //       </Link>
// //   //     ),
// //   //     icon: <TableOutlined />,
// //   //     key: `/${role}/local_sells`,
// //   //   },
// //   //   {
// //   //     label: (
// //   //       <Link href={`/${role}/opening-balance`}>
// //   //         <span style={labelStyle}>Opening Balance</span>
// //   //       </Link>
// //   //     ),
// //   //     icon: <TableOutlined />,
// //   //     key: `/${role}/opening-balance`,
// //   //   },
// //   // ];

// //   if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
// // };

export const sideBarItems = (
  role: string,
  sideBarData: any,
  collapsed: boolean
) => {
  const labelStyle = {
    color: "white",
    fontWeight: "medium",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: "8px",
  };

  function mapSidebarData(data: any, role: string) {
    if (!data) {
      return [];
    }

    return data.map((item: any) => {
      const children =
        item.childs && item.childs.length > 0
          ? mapSidebarData(item.childs, role)
          : undefined;

      const label = item.routeUrl ? (
        <Link href={`/${role}/${item.routeUrl}`}>
          <span style={{}}>
            {item.icon && React.createElement(item.icon)}
            {!collapsed && item.menuName}
          </span>
        </Link>
      ) : (
        <span style={labelStyle}>
          {item.icon && React.createElement(item.icon)}
          {!collapsed && item.menuName}
        </span>
      );

      return {
        label: label,
        key: item.routeUrl || item.menuName,
        children: children,
      };
    });
  }

  if (role === USER_ROLE.SUPER_ADMIN) {
    const superAdminSidebarItems: MenuProps["items"] = mapSidebarData(
      sideBarData,
      role
    );
    return superAdminSidebarItems;
  }
  return []; // Return an empty array for other roles or handle it as needed.
};
