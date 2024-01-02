import React, { useState } from "react";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ChildTableModal from "../Modal/ChildTableModal";
import FormInput from "../Forms/FormInput";
import { useVdsPurchaserDropDownQuery } from "@/redux/api/commercialApi/vdsPurchaserApi";

const DRZvdsForPurchaserTableInForm = ({ rowSelection, tableData }: any) => {
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

  const { data: datasource } = useVdsPurchaserDropDownQuery({
    ...{},
  });

  //Receive Master Id

  // const masterIdOptions =
  //   datasource &&
  //   datasource?.result.map((vdspurchaser: any) => {
  //     return {
  //       label: vdspurchaser?.prodTypeName,
  //       value: parseInt(vdspurchaser?.recvMasterId),
  //     };
  //   });

  const columns: ColumnsType<any> = [
    {
      title: "Receive Master ID",
      dataIndex: "recieveMasterId",
      key: "recieveMasterId",
      sorter: true,
      align: "center",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="--Select ID--"
            optionFilterProp="children"
            // filterOption={(input, option) =>
            //   (option?.label ?? "").includes(input)
            // }
            // filterSort={(optionA, optionB) =>
            //   (optionA?.label ?? "")
            //     .toLowerCase()
            //     .localeCompare((optionB?.label ?? "").toLowerCase())
            // }
            // options={masterIdOptions}
          />
        </>
      ),
    },

    {
      title: "Receive Amount",
      dataIndex: "prodTypeName",
      sorter: true,
      align: "center",
    },
    {
      title: "VAT Amount",
      dataIndex: "prodTypeName",
      sorter: true,
      align: "center",
    },

    {
      title: "Deducted VAT Amount",
      dataIndex: "deductedVatAmount",
      sorter: true,
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
              placeholder="--Input--"
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

export default DRZvdsForPurchaserTableInForm;
