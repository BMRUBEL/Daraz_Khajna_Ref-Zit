"use client";

import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Loading from "@/app/loading";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import { useVatStructureDropDownQuery, useGetSingleVatStructureQuery, useUpdateVatStructureMutation } from "@/redux/api/housekeepingApi/vatStructureApi"
import { Button, Col, Row, Select, message, DatePicker, Radio, Space } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createReceiveSchema } from "@/schemas/receive/createReceiveSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { createVatSchema } from "@/schemas/createVatSchema";
import dayjs, { Dayjs } from 'dayjs';



// Define the type for rowData
interface RowDataType {

  atv: number;
  exd: number;
  tti: number;
  fixedRateUomId: number;
  active: boolean;
  effectiveDate: string; // Assuming effectiveDate is a string or null
}

const EditVat = ({ params }: any) => {

  const [loading, setLoading] = useState(false);


  // Flag to track whether to show the empty row
  const [showEmptyRow, setShowEmptyRow] = useState(false);

  // start child dynamic table
  const [rows, setRows] = useState([
    {
      atv: 0,
      exd: 0,
      tti: 0,
      fixedRateUomId: 4,
      active: true,
      effectiveDate: ""
    },
  ]);

  // const [rowData, setRowData] = useState({});
  const [rowData, setRowData] = useState<RowDataType>({
    atv: 0,
    exd: 0,
    tti: 0,
    fixedRateUomId: 1,
    active: true,
    effectiveDate: ""
  });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const addRow = () => {
    setRows([...rows, rowData]);
    setRowData({
      // vatRateRefId: 0,
      // tranSubTypeId: 0,
      // vatRateTypeId: 0,
      // prodTypeId: 0,
      effectiveDate: "",
      // cd: 0,
      // uomId: 0,
      // sd: 0,
      // vat: 0,
      // at: 0,
      // ait: 0,
      // rd: 0,
      atv: 0,
      exd: 0,
      tti: 0,
      // isFixedRate: true,
      fixedRateUomId: 0,
      // fixedRate: 0,
      active: true
    });
  };


  const [defValue, setDefValue] = useState({});

  const id = params.slug;
  const { data: singleData } = useGetSingleVatStructureQuery(id);
  const masterData = singleData?.result;
  const childData = singleData?.result?.vatStructures;

  //From Master table
  useEffect(() => {
    if (singleData) {
      setDefValue({
        id: masterData?.id,
        hsCode: masterData?.hsCode,

      });
    }
  }, [singleData, masterData]);

  // From child table
  useEffect(() => {
    if (singleData) {
      setDefValue((prevDefValue) => ({
        ...prevDefValue,
        fiscalYear: childData?.[0]?.fiscalYear,
        fiscalYearId: parseInt(childData?.[0]?.fiscalYearId),
        hsCodeId: parseInt(childData?.[0]?.hsCodeId),
        active: childData?.[0]?.active,

      }));
    }
  }, [singleData, childData]);


  useEffect(() => {
    if (childData) {
      setRows([...childData])
    }
  }, [childData])

  const toggleSelect = (index: number) => {
    const selectedIndex = selectedRows.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, index]);
    } else {
      const updatedSelectedRows = [...selectedRows];
      updatedSelectedRows.splice(selectedIndex, 1);
      setSelectedRows(updatedSelectedRows);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      const allIndices: number[] = [];
      for (let i = 0; i < rows.length; i++) {
        allIndices.push(i);
      }
      setSelectedRows(allIndices);
    }
  };


  const deleteSelectedRows = () => {
    const updatedRows = rows.filter(
      (row, index) => !selectedRows.includes(index)
    );
    setRows(updatedRows);
    setSelectedRows([]);
  };

  //save
  const [updateVat, { data: createData }] = useUpdateVatStructureMutation();

  //get all options
  const { data, isLoading } = useVatStructureDropDownQuery({});


  //@ts-ignore
  const fiscalYear: any = data?.result?.fiscalYear;
  const transactionSubStype: any = data?.result?.transactionSubStype;
  const productType: any = data?.result?.productType;
  const vatRateReference: any = data?.result?.vatRateReference;
  const hsCode: any = data?.result?.hsCode;
  const uom: any = data?.result?.uom;
  const vatRateType: any = data?.result?.vat_rate_type;


  const fiscalYearOptions =
    fiscalYear &&
    fiscalYear?.map((year: any) => {
      return {
        label: year?.name,
        value: year?.id,
      };
    });


  const hsCodeOptions =
    hsCode &&
    hsCode?.map((supplier: any) => {
      return {
        label: supplier?.name,
        value: supplier?.id,
      };
    });

  //Child Dropdown

  const vatRateRefOptions =
    vatRateReference &&
    vatRateReference?.map((vatrateref: any) => {
      return {
        label: vatrateref?.name,
        value: vatrateref?.id,
      };
    });

  const tranSubTypeOptions =
    transactionSubStype &&
    transactionSubStype?.map((transubtype: any) => {
      return {
        label: transubtype?.name,
        value: transubtype?.id,
      };
    });

  const vatRateTypeOptions =
    vatRateType &&
    vatRateType?.map((vateratetype: any) => {
      return {
        label: vateratetype?.name,
        value: vateratetype?.id,
      };
    });

  const productTypeOptions =
    productType &&
    productType?.map((prodtype: any) => {
      return {
        label: prodtype?.name,
        value: prodtype?.id,
      };
    });

  const uomOptions =
    uom &&
    uom?.map((fruom: any) => {
      return {
        label: fruom?.name,
        value: fruom?.id,
      };
    });
  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());


  const router = useRouter();





  const [activeStatus, setActiveStatus] = useState(true);

  const handleStatusChange = (value: boolean) => {

    setActiveStatus(value);
    console.log('radio checked', value);
  };


  const handleSelectChange = (value: any, index: any) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, vatRateRefId: value || null };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleSelectChangeTran = (value: any, index: any) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, tranSubTypeId: value || null };
      }
      return row;
    });
    setRows(updatedRows);
  };


  //handleSelectChangeVat


  const handleSelectChangeVat = (value: any, index: any) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, vatRateTypeId: value || null };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleSelectChangeProd = (value: any, index: any) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, prodTypeId: value || null };
      }
      return row;
    });
    setRows(updatedRows);
  };



  const handleSelectChangeDate = (value: dayjs.Dayjs | null, index: any) => {

    const formattedDate = value ? value.endOf('day').toISOString().split('T')[0] : null!;
    const updatedRows = [...rows];

    updatedRows[index] = {
      ...updatedRows[index],
      effectiveDate: formattedDate,
    };

    setRows(updatedRows);
  };



  const handleSelectChangeUom = (value: any, index: any) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, uomId: value || null };
      }
      return row;
    });
    setRows(updatedRows);
  };


  const handleSelectChangeFixedRate = (value: any, index: any) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, isFixedRate: value === 'true' ? true : value === 'false' ? false : null };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // submit handler

  const onSubmit = async (values: any) => {


    values.vatStructures = [...rows];

    // Check if there are non-blank rows in the vatStructures array
    const nonBlankRows = values.vatStructures.filter(
      (row: any) =>
        Object.values(row).some((value) => value !== null && value !== undefined && value !== "")
    );

    if (nonBlankRows.length === 0) {
      // If all rows are blank, don't submit
      message.error("Error!! Vat Structures cannot be blank");
      return;
    }
    console.log("Values");
    try {

      setLoading(true);
      // const res = await updateVat(values);
      const res = await updateVat({
        id,
        body: values,
      }).unwrap();
      console.log(res, "Response");

      if (res) {
        message.success("Vat Updated successfully!");
        router.push(`/super_admin/hk/vat-structure`);
      } else {
        message.error("Error!! Update Failed");
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };



  // table children

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
       
        <UMBreadCrumb pageName="Vat Structure" lastName="Update"  link="/super_admin/hk/vat-structure" />
       

      <div
        style={{
          padding: "20px 0px",
          marginTop: "0px",
        }}
      >
        <div style={{}}>
          <Form
            submitHandler={onSubmit}
            // resolver={yupResolver(createVatSchema)}
            defaultValues={defValue}
          >
            <div
              style={{
                marginBottom: "10px",
                padding: "20px",
                marginTop: "11px",
                backgroundColor: "#fff6f6e6",
                borderRadius: "10px",
                border: "1px solid #e9e8e8",
                boxSizing: "border-box",
              }}
            >

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                      align: "left",
                    }}
                    size="large"

                    name="hsCodeId"
                    options={hsCodeOptions}
                    label="HS Code: "
                    placeholder="Select HS Code"
                    required
                    onSearch={onSearch}
                    filterOption={filterOption}
                    disable

                  />
                </Col>
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
                      align: "left",
                    }}
                    size="large"
                    name="fiscalYearId"
                    options={fiscalYearOptions}
                    label="Fiscal Year: "
                    placeholder="Select Fiscal Year"
                    required
                    onSearch={onSearch}
                    filterOption={filterOption}


                  />
                </Col>
                <Col
                  className="gutter-col"
                  span={6}
                  style={{
                    marginBottom: "20px",
                    display: "grid"
                  }}
                  aria-required

                >
                  <label htmlFor="status">Status:</label>
                  <Radio.Group onChange={(e) => handleStatusChange(e.target.value)} value={activeStatus}>
                    <Space direction="horizontal">
                      <Radio value={true}>Active</Radio>
                      <Radio value={false}>In Active</Radio>
                    </Space>
                  </Radio.Group>

                </Col>
              </Row>
            </div>

            <div
              style={{
                marginBottom: "10px",
                padding: "20px",
                marginTop: "11px",
                backgroundColor: "#fff6f6e6",
                borderRadius: "10px",
                border: "1px solid #e9e8e8",
                boxSizing: "border-box",
              }}
            >
              <Row
                style={{
                  padding: "0px 0px",
                }}
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              >
                {" "}
                <Col
                  className="gutter-row"
                  span={24}
                  style={{
                    marginBottom: "20px",
                  }}
                  aria-required
                >
                  {/* form child  start */}

                  <div className="relative overflow-x-auto  sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="bg-orange-thead text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th className="px-2 py-2">
                            <input
                              type="checkbox"
                              checked={selectedRows.length === rows.length}
                              onChange={toggleSelectAll}
                              className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                          </th>
                          <th className="px-2 py-2" style={{
                            width: "10%",
                          }}>
                            VAT Rate Ref.
                          </th>
                          <th className="px-2 py-2" style={{
                            width: "10%",
                          }}>
                            Tran Sub Type
                          </th>
                          <th
                            className="px-2 py-2"
                            style={{
                              width: "10%",
                            }}
                          >
                            VAT Rate Type
                          </th>
                          <th
                            className="px-2 py-2"
                            style={{
                              width: "10%",
                            }}
                          >
                            Product Type
                          </th>
                          <th className="px-2 py-2" style={{
                            width: "10%",
                          }}>Effective Date</th>
                          <th className="px-2 py-2" style={{
                            width: "5%",
                          }}>CD(%)</th>
                          <th className="px-2 py-2" style={{
                            width: "5%",
                          }}>RD(%)</th>
                          <th className="px-2 py-2" style={{
                            width: "5%",
                          }}>SD(%)</th>
                          <th className="px-2 py-2" style={{
                            width: "5%",
                          }}>VAT(%)</th>
                          <th className="px-2 py-2" style={{
                            width: "5%",
                          }}>AIT(%)</th>
                          <th className="px-2 py-2" style={{
                            width: "5%",
                          }}>AT(%)</th>
                          <th className="px-2 py-2" >Is Fixed Rate</th>
                          <th className="px-2 py-2">FR UOM</th>
                          <th className="px-2 py-2" style={{
                            width: "5%",
                          }}>Fixed Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((item: any, index: any) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(index)}
                                onChange={() => toggleSelect(index)}
                                className="form-checkbox h-5 w-5 text-indigo-600"
                              />
                            </td>
                            <td>
                              <Select
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                options={vatRateRefOptions}
                                placeholder="Select"
                                onChange={(value) => {
                                  handleSelectChange(value, index);
                                }}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                value={item?.vatRateRefId || null} // Handle null value for initial rendering
                              />


                            </td>
                            <td>
                              <Select
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                placeholder="Select"
                                onChange={(value) => {
                                  handleSelectChangeTran(value, index);
                                }}
                                options={tranSubTypeOptions}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                value={item?.tranSubTypeId}
                              />
                            </td>
                            <td>
                              <Select
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                placeholder="Select"
                                onChange={(value) => {
                                  handleSelectChangeVat(value, index);
                                }}
                                options={vatRateTypeOptions}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                value={item?.vatRateTypeId}
                              />
                            </td>
                            <td>
                              <Select
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                placeholder="Select"
                                onChange={(value) => {
                                  handleSelectChangeProd(value, index);
                                }}
                                options={productTypeOptions}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                value={item?.prodTypeId}
                              />
                            </td>
                            <td>

                              <DatePicker
                                value={item && item.effectiveDate ? dayjs(item.effectiveDate) : null}
                                onChange={(value) => {
                                  if (dayjs.isDayjs(value) || value === null) {
                                    handleSelectChangeDate(value, index);
                                  }
                                }}
                              />

                            </td>
                            <td>
                              <FormInput
                                type="number"
                                placeholder="CD"
                                name=""
                                onChange={(e) => {
                                  const updatedRows = rows.map((row, i) => {
                                    if (i === index) {
                                      return { ...row, cd: parseInt(e.target.value) };
                                    }
                                    return row;
                                  });
                                  setRows(updatedRows);
                                }}
                                value={item?.cd}
                              />


                            </td>
                            <td>
                              <FormInput
                                type="number"
                                placeholder="RD"
                                name=""
                                onChange={(e) => {
                                  const updatedRows = rows.map((row, i) => {
                                    if (i === index) {
                                      return { ...row, rd: parseInt(e.target.value) };
                                    }
                                    return row;
                                  });
                                  setRows(updatedRows);
                                }}

                                value={item?.rd}
                              />
                            </td>
                            <td>
                              <FormInput
                                type="number"
                                placeholder="SD"
                                name=""
                                onChange={(e) => {
                                  const updatedRows = rows.map((row, i) => {
                                    if (i === index) {
                                      return { ...row, sd: parseInt(e.target.value) };
                                    }
                                    return row;
                                  });
                                  setRows(updatedRows);
                                }}

                                value={item?.sd}

                              />
                            </td>
                            <td>
                              <FormInput
                                type="number"
                                placeholder="VAT"
                                name=""
                                onChange={(e) => {
                                  const updatedRows = rows.map((row, i) => {
                                    if (i === index) {
                                      return { ...row, vat: parseInt(e.target.value) };
                                    }
                                    return row;
                                  });
                                  setRows(updatedRows);
                                }}
                                value={item?.vat}
                              />
                            </td>
                            <td>
                              <FormInput
                                type="number"
                                placeholder="AIT"
                                name=""
                                onChange={(e) => {
                                  const updatedRows = rows.map((row, i) => {
                                    if (i === index) {
                                      return { ...row, ait: parseInt(e.target.value) };
                                    }
                                    return row;
                                  });
                                  setRows(updatedRows);
                                }}

                                value={item?.ait}
                              />
                            </td>
                            <td>
                              <FormInput
                                type="number"
                                placeholder="AT"
                                name=""
                                onChange={(e) => {
                                  const updatedRows = rows.map((row, i) => {
                                    if (i === index) {
                                      return { ...row, at: parseInt(e.target.value) };
                                    }
                                    return row;
                                  });
                                  setRows(updatedRows);
                                }}

                                value={item?.at}
                              />
                            </td>
                            <td>

                              <Select
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                placeholder="Select"
                                onChange={(value) => {
                                  handleSelectChangeFixedRate(value, index);
                                }}
                                options={[
                                  { value: 'true', label: 'Yes' },
                                  { value: 'false', label: 'No' },
                                ]}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                value={item?.isFixedRate === true ? 'true' : item?.isFixedRate === false ? 'false' : null}
                              />

                            </td>
                            <td>

                              <Select
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                placeholder="Select"
                                onChange={(value) => {
                                  handleSelectChangeUom(value, index);
                                }}
                                options={uomOptions}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                value={item?.uomId}
                              />
                            </td>
                            <td>
                              <FormInput
                                type="number"
                                placeholder="Fixed Rate"
                                name=""
                                onChange={(e) => {
                                  const updatedRows = rows.map((row, i) => {
                                    if (i === index) {
                                      return { ...row, fixedRate: parseInt(e.target.value) };
                                    }
                                    return row;
                                  });
                                  setRows(updatedRows);
                                }}
                                value={item?.fixedRate}

                              />
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* form child end  */}
                </Col>
              </Row>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  // padding: "0px 40px",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Button
                    shape="circle"
                    icon={<PlusCircleOutlined />}
                    onClick={addRow}
                    style={{
                      background: "#02BBDB",
                      color: "white",
                    }}
                  />{" "}
                  <Button
                    type="primary"
                    className="ms-3"
                    danger
                    shape="circle"
                    icon={<DeleteOutlined />}
                    onClick={deleteSelectedRows}
                  />{" "}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                  }}
                >
                  <Link href={`/super_admin/hk/vat-structure`}>
                    {" "}
                    <DarazCommonCloseButton>Close</DarazCommonCloseButton>
                  </Link>
                  <DarazCommonButton>Save</DarazCommonButton>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditVat;
