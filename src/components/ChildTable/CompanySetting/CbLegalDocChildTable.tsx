import Loading from "@/app/loading";
import UMTable from "@/components/ui/DRZTable";
import { useLegaldoucumentsQuery } from "@/redux/api/companyApi/legalDocApi";
import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

const columns = [
  {
    title: "S/L",
    dataIndex: "recvMasterId",
    sorter: true,
    width: 250,
    align: "center",
  },
  {
    title: "Doc Name",
    dataIndex: "prodTypeName",
    width: 250,
    align: "center",
  },
  {
    title: "Doc Type",
    dataIndex: "storeName",
    width: 250,
    align: "center",
  },
  {
    title: "Upload Date",
    dataIndex: "receiveDate",
    width: 250,
    align: "center",
  },
  {
    title: "Expirde Date",
    dataIndex: "receiveDate",
    width: 300,
    align: "center",
  },
  {
    title: "Action",
    dataIndex: "recvMasterId",
    width: 220,
    align: "center",
    render: (record: any) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          href={`/super_admin/company-setting/legal-documents/view/${record}`}
        >
          <Button
            style={{
              fontSize: "13px",
              padding: "0px 7px 5px 7px",
              borderRadius: "0px",
              height: "28px",
            }}
            className="bg-[#FF5100]"
            onClick={() => console.log(record)}
            type="primary"
          >
            <EyeOutlined />
          </Button>
        </Link>
      </div>
    ),
  },
];

const LegalDocChildTable = () => {
  const query: Record<string, any> = {};
  const { data: dataSource, isLoading } = useLegaldoucumentsQuery({
    ...query,
  });
  // Extract the first data item from the response
  const singleData = dataSource?.result ? [dataSource.result[1]] : [];

  return (
    <div
      style={{
        marginTop: "11px",
        backgroundColor: "#fff6f6e6",
        borderRadius: "10px",
        border: "1px solid #e9e8e8",
        width: "100%",
      }}
    >
      <p className="pt-5 pl-5 text-xl font-semibold pb-4">Legal Documents</p>
      {isLoading ? (
        <Loading />
      ) : (
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={singleData}
          showPagination={false}
        />
      )}
    </div>
  );
};
export default LegalDocChildTable;
