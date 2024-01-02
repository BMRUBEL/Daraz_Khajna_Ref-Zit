import { Table } from "antd";

type UMTableProps = {
  loading?: boolean;
  columns: any;
  dataSource: any;
  onTableChange?: (pagination: any, filter: any, sorter: any) => void;
  pageSize?: number;
  pageNo?: number;
  totalPages?: number;
  showSizeChanger?: boolean;
  resetFilters?: any;
  onPaginationChange?: (page: number, pageSize: number) => void;
  showPagination?: boolean;
};

const UMTable = ({
  loading = false,
  columns,
  dataSource,
  onTableChange,
  pageSize = 10,
  resetFilters,
  pageNo,
  totalPages,
  showSizeChanger,
  onPaginationChange,
  showPagination = true,
}: UMTableProps) => {
  const paginationConfig = showPagination
    ? totalPages && totalPages > 0
      ? {
          pageNo: pageNo,
          pageSize: pageSize,
          total: totalPages,
          pageSizeOptions: [5, 10, 20, 50, 100, 500],
          showSizeChanger: showSizeChanger,
          onChange: onPaginationChange,
        }
      : false
    : false;

  return (
    <Table
      scroll={{ x: 300 }}
      loading={loading}
      className="shadow-md"
      columns={columns}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onTableChange}
    ></Table>
  );
};

export default UMTable;
