"use client";

import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  toname: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Exchange From ",
    dataIndex: "name",
  },
  {
    title: "Exchange To ",
    dataIndex: "toname",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "USD",
    toname: "INR 90",
  },
  {
    key: "1",
    name: "$ 1",
    toname: "BDT 120",
  },
  {
    key: "1",
    name: "",
    toname: "AED 50",
  },
  {
    key: "1",
    name: "",
    toname: "RM 20",
  },
];

const ExchangeRateTable = () => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }}></span>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default ExchangeRateTable;
