import { useChildItemQuery } from "@/redux/api/receive/receiveApi";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addNewRow } from "@/redux/slices/receiveSlice";
import { Button, Input, Select } from "antd";
import { RootState } from "../../redux/store";

const onSearch = (value: string) => {
  console.log("search:", value);
};

const DynamicTable = () => {
  const { data: childData } = useChildItemQuery({});
  const dispatch = useAppDispatch();
  // states
  // const [selectedRows, setSelectedRows] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);
  // reducers
  const receiveDatas = useAppSelector((state: RootState) => state.receive.rows);

  const onChange = (value: string, option: any) => {
    const selectedChildItem = childData?.result.find(
      (item: any) => item.itemInfoId === value
    );
    console.log(selectedChildItem, 'uoms');
    dispatch(addNewRow(selectedChildItem));
  };

  const onUmoChange = (value: string, option: any) => {};

  const generateUmoOptions = (uomList: any) => {
    console.log(uomList, "umo");
    return uomList?.map((item: any) => {
      return { value: item.uomId, label: item.uomShortCode };
    });
  };

  // const toggleSelect = (row) => {
  //   if (selectedRows.includes(row)) {
  //     setSelectedRows(selectedRows.filter((r) => r !== row));
  //   } else {
  //     setSelectedRows([...selectedRows, row]);
  //   }
  // };

  const itemOptions =
    childData &&
    childData?.result?.map((options: any) => {
      return {
        label: options?.itemDisplayName,
        value: options?.itemInfoId,
      };
    });

  // const toggleSelectAll = () => {
  //   if (selectAll) {
  //     setSelectedRows([]);
  //   } else {
  //     setSelectedRows(data.map((row) => row.id));
  //   }
  //   setSelectAll(!selectAll);
  // };

  return (
    <div className="relative overflow-x-auto  sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="bg-orange-thead   text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-2 py-2">
              {/* <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="form-checkbox h-5 w-5 text-indigo-600"
              /> */}
            </th>
            <th className="px-2 py-2">Item Name</th>
            <th className="px-2 py-2">UOM</th>
            <th
              className="px-2 py-2"
              style={{
                width: "10%",
              }}
            >
              Receive Qty
            </th>
            <th
              className="px-2 py-2"
              style={{
                width: "10%",
              }}
            >
              Receive Rate
            </th>
            <th className="px-2 py-2">Receive Amount</th>
            <th className="px-2 py-2">Vat Amount</th>
            <th className="px-2 py-2">Total Amount</th>
            <th className="px-2 py-2">Action Amount</th>
          </tr>
        </thead>
        <tbody>
          {receiveDatas.length < 1 ? (
            <>
              <tr>
                <td className="px-2 py-2">
                  {/* <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleSelect(row.id)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  /> */}
                </td>
                <td className="px-2 py-2">
                  <Select
                    style={{
                      width: "100%",
                    }}
                    showSearch
                    placeholder="Select Item"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={itemOptions}
                    options={itemOptions}
                  />
                </td>
                <td className="px-2 py-2">
                  <Select
                    style={{
                      width: "100%",
                    }}
                    showSearch
                    placeholder="Select Item"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={itemOptions}
                  />
                </td>
                <td className="px-2 py-2">
                  <Input placeholder="Recv. Qty" name="child.qty" />
                </td>
                <td className="px-2 py-2">
                  <Input placeholder="Recv. Reate" name="child.rate" />
                </td>

                <td className="px-2 py-2">23</td>
                <td className="px-2 py-2">234</td>
                <td className="px-2 py-2">234</td>
                <td className="px-2 py-2">
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "green",
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>{" "}
            </>
          ) : (
            <>
              {receiveDatas?.map((row: any, index: number) => (
                <tr
                  key={row.id}
                  className={index % 2 == 1 ? "bg-orange-low" : ""}
                >
                  <td className="px-2 py-2">
                    {/* <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => toggleSelect(row.id)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  /> */}
                  </td>
                  <td className="px-2 py-2">
                    <Select
                      style={{
                        width: "100%",
                      }}
                      showSearch
                      placeholder="Select Item"
                      optionFilterProp="children"
                      onChange={onChange}
                      onSearch={onSearch}
                      filterOption={itemOptions}
                      options={itemOptions}
                    />
                  </td>
                  <td className="px-2 py-2">
                    {" "}
                    {row?.uomList}
                    <Select
                      style={{
                        width: "100%",
                      }}
                      showSearch
                      placeholder="Select Item"
                      optionFilterProp="children"
                      onChange={onUmoChange}
                      options={generateUmoOptions(row.umoList)}
                    />
                  </td>
                  <td className="px-2 py-2">
                    <Input placeholder="Recv. Qty" name="child.qty" />
                  </td>
                  <td className="px-2 py-2">
                    <Input placeholder="Recv. Reate" name="child.rate" />
                  </td>

                  <td className="px-2 py-2">{row?.hsCodeId}</td>
                  <td className="px-2 py-2">{row?.hsCodeId}</td>
                  <td className="px-2 py-2">{row?.hsCodeId}</td>
                  <td className="px-2 py-2">
                    {" "}
                    <Button
                      type="primary"
                      style={{
                        backgroundColor: "green",
                      }}
                    >
                      Details
                    </Button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
