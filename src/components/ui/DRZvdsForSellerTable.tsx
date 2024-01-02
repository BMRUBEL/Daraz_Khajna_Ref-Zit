import React, { useState } from "react";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useVdsSellerDropDownQuery } from "@/redux/api/commercialApi/vdsSellerApi";
import FormInput from "../Forms/FormInput";

const DRZvdsForSellerTable = ({ rowSelection, tableData }: any) => {
  // const toggleNewColumn = () => {
  //   setShowNewColumn(!showNewColumn);
  // };

  const { data: datasource } = useVdsSellerDropDownQuery({
    ...{},
  });

  //Receive Master Id

  const masterIdOptions =
    datasource &&
    datasource?.result?.issueMaster.map((vdsseller: any) => {
      return {
        label: vdsseller?.name,
        value: parseInt(vdsseller?.id),
      };
    });

  const columns: ColumnsType<any> = [
    {
      title: "Issue Master ID",
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
      title: "Issue Amount",
      dataIndex: "issueAmount",
      align: "center",
    },
    {
      title: "VAT Amount",
      dataIndex: "vatAmount",
      align: "center",
    },
   {
      title: "Deducted VAT Amount",
      dataIndex: "deductedVatAmount",
      align: "center",
      render: () => (
        <>
          {
            <FormInput
              style={{
                width: "100%",
                // outline: "none",
                textAlign: "center",
                textarea: "focus",
                border: "none",
              }}
              type="text"
              name="deductVatAmount"
              placeholder="0.00"
            />
          }
        </>
      ), 
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

export default DRZvdsForSellerTable;
