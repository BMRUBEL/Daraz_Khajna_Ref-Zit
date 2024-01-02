import React, { useState } from "react";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ChildTableModal from "../Modal/ChildTableModal";
import { useOtherAdjustmentDropDownQuery } from "@/redux/api/commercialApi/otherAdjustmentApi";
import FormInput from "../Forms/FormInput";

const DRZoaTableInForm = ({ rowSelection, tableData }: any) => {
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

  const { data: datasource } = useOtherAdjustmentDropDownQuery({
    ...{},
  });

  //Receive Master Id

  const masterIdOptions =
    datasource &&
    datasource?.result?.paymentModes.map((vdsseller: any) => {
      return {
        label: vdsseller?.name,
        value: parseInt(vdsseller?.id),
      };
    });

  const columns: ColumnsType<any> = [
    {
      title: "Service Description",
      dataIndex: "serviceDescription",
      key: "serviceDescription",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="--Select Service--"
            optionFilterProp="children"
            // filterOption={(input, option) =>
            //   (option?.label ?? "").includes(input)
            // }
            // filterSort={(optionA, optionB) =>
            //   (optionA?.label ?? "")
            //     .toLowerCase()
            //     .localeCompare((optionB?.label ?? "").toLowerCase())
            // }
            options={masterIdOptions}
          />
        </>
      ),
    },

    {
      title: "Bill Amount",
      dataIndex: "billAmount",
      align: "center",
    },
    {
      title: "VAT Amount",
      dataIndex: "vatAmount",
      align: "center",
    },
    {
      title: "Rebate Amount",
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

export default DRZoaTableInForm;
