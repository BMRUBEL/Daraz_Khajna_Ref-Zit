import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import styles from "../../app/styles/receive/TableStyle.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { changeDebateAble } from "@/redux/slices/receiveSlice";

interface DataType {
  SL: number;
  key: React.Key;
  name: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "SL",
    dataIndex: "SL",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "করযোগ্য সরবরাহের মূল্য ১,০০,০০০.০০ (এক লক্ষ) টাকা অতিক্রম করেছে এবং উক্ত সরবরাহের সমুদয় পণ্য ব্যাংকিং মাধ্যমে পরিশোধ করা হয়েছে।",
    SL: 1,
  },
  {
    key: "2",
    name: "আমদানিকৃত সেবার সরবরাহ গ্রহনের ক্ষেত্রে দাখিলপত্রে উক্ত সেবা সরবরাহের উপর প্রদেয় উৎপাদ কর প্রর্দশন করা হয়েছে।",
    SL: 2,
  },
  {
    key: "3",
    name: "	যে কর মেয়াদে উপকরন কর পরিশোধ করা হয়েছে, সেই কর মেয়াদে বা তার পরবর্তী চারটি কর মেয়াদের মধ্যে উপকরন কর রেয়াত গ্রহন করা হয়েছে।",
    SL: 3,
  },
  {
    key: "4",
    name: "অন্যের অধিকারে, দখলে বা তত্তবধানে রক্ষিত পণ্য বা সেবার বিপরীতে পরিশোধিত মূল্য সংযোযন কর রেয়াত নেয়া হয় নাই।",
    SL: 4,
  },
  {
    key: "5",
    name: "কোন পণ্য বা সেবা বিধি দ্বারা নির্ধারিত ক্রয় হিসাব পুস্তকে বা ক্রয় বিক্রয় হিসাব পুস্তকে অন্তর্ভুক্ত করা হয়েছে.",
    SL: 5,
  },
  {
    key: "6",
    name: "কর চালানপত্রে ক্রেতা ও বিক্রেতা উভয়ের নাম, ঠিকানা ও নিবন্ধন নম্বর উল্লেখ আছে ।",
    SL: 6,
  },
  {
    key: "7",
    name: "আমদানিকারকের নিকট হতে সরবরাহ গ্রহণের ক্ষেত্রে আমদানিকারক কর্তূক ইস্যুকৃত কর চালানপত্রে আমদানি চালান সংশ্লিস্ট বিল অব এন্ট্রি নম্বর উল্লেখ আছে এবং কর চালানপত্রে বর্ণিত পণ্যের বর্ণ্নার মিল আছে ।",
    SL: 7,
  },
  {
    key: "8",
    name: "ব্যাংক গ্যারাণ্টির মাধ্যমে খালাসকৃত উপকরণ বা পণ্যের ক্ষেত্রে, যে কারণে উক্ত ব্যাংক গ্যারান্টি গ্রহন করা হয়েছে তা চুড়ান্তভাবে নিস্পত্তি করা হয়েছে।",
    SL: 8,
  },
];

const SimpleTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedRowKeys.length == 8) {
      dispatch(changeDebateAble(selectedRowKeys.length));
    } else {
      dispatch(changeDebateAble(selectedRowKeys.length));
    }
  }, [dispatch, selectedRowKeys.length]);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default SimpleTable;
