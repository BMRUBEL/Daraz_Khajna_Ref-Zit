import React, { useState } from "react";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ChildTableModal from "../Modal/ChildTableModal";
import FormInput from "../Forms/FormInput";
import { useVdsPaymentDropDownQuery } from "@/redux/api/commercialApi/vdsPaymentApi";

const DRZvdsForPaymentTable = ({ rowSelection, tableData }: any) => {
  // const toggleNewColumn = () => {
  //   setShowNewColumn(!showNewColumn);
  // };

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const { data: datasource } = useVdsPaymentDropDownQuery({
    ...{},
  });

  //Receive Master Id

  const masterIdOptions =
    datasource &&
    datasource?.result?.map((vdspayment: any) => {
      return {
        label: vdspayment?.prodTypeName,
        value: parseInt(vdspayment?.id),
      };
    });

  const columns: ColumnsType<any> = [
    {
      title: "VDS Purchase Master ID",
      dataIndex: "issueMasterId",
      key: "issueMasterId",
      align: "center",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{
              width: "100%",
              textAlign: "center",
              borderStyle: "none",
            }}
            placeholder="--Select ID--"
            optionFilterProp="children"
            options={masterIdOptions}
          />
        </>
      ),
    },

    {
      title: "VDS Purchase Date",
      dataIndex: "issueAmount",
      sorter: true,
      align: "center",
    },
    {
      title: "Payable VAT Amount",
      dataIndex: "vatAmount",
      sorter: true,
      align: "center",
    },
    {
      title: "Fine",
      dataIndex: "deductedVatAmount",
      sorter: true,
      align: "center",
    },
    {
      title: "Total Payable VAT Amount",
      dataIndex: "deductedVatAmount",
      sorter: true,
      align: "center",
    },
  ];

  return (
    <div>
      <Table
        style={{
          width: "100%",
        }}
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default DRZvdsForPaymentTable;
