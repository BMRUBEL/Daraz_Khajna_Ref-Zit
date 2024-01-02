"use client";

import Loading from "@/app/loading";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormCheckbox from "@/components/Forms/DarazCheckBox";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import {
  useAddTransactionMutation,
  useTranssourctypeQuery,
} from "@/redux/api/housekeepingApi/transactionApi";
import { tranTypeSchema } from "@/schemas/tranTypeSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Input, message, Row, Radio } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowLeftOutlined, SwapLeftOutlined, SwapRightOutlined } from "@ant-design/icons";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";






const CreateTransactionPage = () => {


  const staticStoreList = [
    {
      id: 1,
      storeName: 'Dinajpur Hub',
      active: true,
    },
    {
      id: 2,
      storeName: 'Chattrogram Hub',
      active: false,
    },
    {
      id: 3,
      storeName: 'Tangail Hub',
      active: false,
    },

  ];


  const { data: datasource } = useTranssourctypeQuery({
    ...{},
  });
  console.log(datasource, "source");

  //State
  const [storeData, setStoreData] = useState([]);
  const [selectedStore, setSelectedStore] = useState([]);
  const [selectedExistingStore, setSelectedExistingStore] = useState([]);
  const [isSwiping, setIsSwiping] = useState(false);


  const [disabled, setDisabled] = useState(true);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (datasource) {
          const fetchedStoreData = datasource.result;
          setStoreData(fetchedStoreData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error (e.g., display an error message to the user)
      }
    };

    fetchData();
  }, [datasource]);


  const handleStoreClick = (store) => {
    // Update the selected store when a row is clicked
    setSelectedStore(store);
    setSelectedExistingStore(null);
  };


  const handleExistingStoreClick = (store) => {
    // Update the selected store when a row is clicked
    setSelectedExistingStore(store);
    setSelectedStore(null); // Clear selection for store list
  };

  //Handle Swip Right
  const handleSwapRight = () => {
    if (selectedStore && selectedExistingStore) {
      setIsSwiping(true);

      // Filter out the selected store from the current array
      const updatedStoreData = staticStoreList.filter(store => store.id !== selectedStore.id);

      // Add the selected store to the end of the existing store array
      const updatedExistingStoreData = [...updatedStoreData, { ...selectedStore, active: true }];

      // Update the state with the new data
      setStoreData(updatedExistingStoreData);

      // Clear selections and reset swiping status after swapping
      setSelectedStore(null);
      setSelectedExistingStore(null);
      setIsSwiping(false);

      // Log to the console
      console.log("Swapped Right:", selectedStore.storeName, "<->", selectedExistingStore.storeName);
    }
  };


  // Left Button
  const handleSwapLeft = () => {
    console.log("Swapping Left...");

    if (selectedStore && selectedExistingStore) {
      setIsSwiping(true);

      console.log("Before Swapping - selectedStore:", selectedStore);

      // Use the state updater function to ensure you're working with the latest state
      setSelectedStore((prevSelectedStore) => {
        // Log the previous state before updating
        console.log("Before Swapping - selectedStore:", prevSelectedStore);

        // Map over the data to create a new array with the updated values
        const updatedStoreData = storeData.map(store => {
          if (store.id === selectedStore.id) {
            return { ...store, tranSourceTypeNameBN: selectedExistingStore.tranSourceTypeNameBN };
          } else if (store.id === selectedExistingStore.id) {
            return { ...store, tranSourceTypeNameBN: selectedStore.tranSourceTypeNameBN };
          }
          return store;
        });

        // Log the updated state
        console.log("After Swapping - selectedStore:", updatedStoreData);

        // Return the updated data to be set as the new state
        return updatedStoreData;
      });

      // Clear selections and reset swiping status after swapping
      setSelectedExistingStore(null);
      setIsSwiping(false);
    }
  };


  console.log("Before Click - storeData:", storeData);
  console.log("Before Click - selectedStore:", selectedStore);
  console.log("Before Click - selectedExistingStore:", selectedExistingStore);


  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });

  const [updateStore, { data: createData }] = useAddTransactionMutation();

  console.log(createData, "Update Store");

  const router = useRouter();


  const transactionOptions =
    datasource &&
    datasource?.result.map((transaction: any) => {
      return {
        label: transaction?.tranSourceTypeNameBN,
        value: parseInt(transaction?.tranSourceTypeId),
      };
    });

  console.log(transactionOptions, "options");
  if (isLoading || loading) {
    return <Loading />;
  }

  const onChange = (value: string) => { };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());



  // submit handler
  const onSubmit = async (values: any) => {
    try {
      console.log("on submit");
      setLoading(true);
      const res = await updateStore(values);
      if (res) {
        message.success("Store location Updated successfully!");
        router.push(
          `/super_admin/company-setting/company-store/store-user-mapping/view/${res.data.result.id}`
        );
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb pageName="Store Location" lastName="Create" />
      <div
        style={{
          padding: "20px",
          marginTop: "11px",
          backgroundColor: "#fff6f6e6",
          borderRadius: "10px",
          border: "1px solid #e9e8e8",
          boxSizing: "border-box",
        }}
      >
        <Form submitHandler={onSubmit} >
          <div
            style={{
              padding: "0px",
              marginTop: "12px",
            }}
          >
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
              >
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsTypeName"
                  options={transactionOptions}
                  label="User Name:   "
                  placeholder="Select Name"
                  required
                  onSearch={onSearch}
                  filterOption={filterOption}
                />
              </Col>

            </Row >
            <div className={`grid gap-4 grid-cols-3 ${isSwiping ? 'swiping' : ''}`} >

              <div>
                <p className="pt-4 pb-4 text-sm">Store List</p>
                <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
                  <thead className="bg-orange-thead text-xs bg-gray-50 dark:bg-gray-700 ">
                    <tr>
                      <th className="px-4 py-4">
                        Store Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staticStoreList.map(store => (
                      <tr key={store.id} onClick={() => handleStoreClick(store)}
                        className={`w-full ${selectedStore && selectedStore.id === store.id ? 'bg-[#FDF2E9]' : 'bg-[#F4F6F6]'} cursor-pointer `}>
                        <td>
                          <p className="px-4 py-4">{store.storeName}</p>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>

              <div style={{
                display: "flex",
                gridTemplateColumns: "repeat(2, 1fr)", // Two columns
                gap: "10px",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",


              }}>
                <Button style={{
                  fontSize: "20px",
                  padding: "0px 7px 5px 7px",
                  borderRadius: "0px",
                  height: "50px",
                  width: "50px"
                }}
                  className="bg-[#E74C3C]"
                  onClick={handleSwapLeft}
                  type="primary"
                >
                  <SwapLeftOutlined />
                </Button>

                <Button style={{
                  fontSize: "20px",
                  padding: "0px 7px 5px 7px",
                  borderRadius: "0px",
                  height: "50px",
                  width: "50px"
                }}
                  className="bg-[#27AE60]"
                  onClick={handleSwapRight}
                  type="primary"
                >
                  <SwapRightOutlined />
                </Button>
              </div>

              <div>
                <p className="pt-4 pb-4 text-sm">Existing Store List</p>
                <table className="w-full text-xs text-left text-gray-500 dark:text-gray-400">
                  <thead className="bg-orange-thead text-xs bg-gray-50 dark:bg-gray-700 ">
                    <tr>
                      <th className="px-4 py-4">
                        <p>Store Name
                        </p>
                      </th>
                      <th className="px-4 py-4 text-right">
                        <p>Is Default
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {staticStoreList.map(store => (
                      <tr key={store.id} onClick={() => handleExistingStoreClick(store)}
                      className={`w-full ${selectedExistingStore && selectedExistingStore.id === store.id ? 'bg-[#FDF2E9]' : 'bg-[#F4F6F6]'} cursor-pointer `}>
                        <td >
                          <p className="px-4 py-4">{store.storeName}</p>
                        </td>
                        <td className="text-right">
                          <Radio defaultChecked={store.active} disabled={disabled} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <Link href={`/super_admin/company-setting/company-store/store-user-mapping`}>
                {" "}
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </Link>
              <DarazCommonButton>Save</DarazCommonButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateTransactionPage;
