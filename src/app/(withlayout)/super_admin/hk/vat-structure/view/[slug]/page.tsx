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
import { useGetSingleVatStructureQuery } from "@/redux/api/housekeepingApi/vatStructureApi"
import { Button, Col, Row, Select, message, Radio, Space } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createReceiveSchema } from "@/schemas/receive/createReceiveSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import dayjs, { Dayjs } from 'dayjs';



const ViewVat = ({ params }: any) => {

  //State
  const [loading, setLoading] = useState(false);
  const [defValue, setDefValue] = useState({});


  const id = params.slug;
  const { data } = useGetSingleVatStructureQuery(id);
  const masterData = data?.result;
  const childData = data?.result?.vatStructures;

  console.log(
    "🚀 Child Data",
    childData
  );

  console.log(
    "🚀 Master Data",
    masterData
  );
  //From Master table
  useEffect(() => {
    if (data) {
      setDefValue({

        id: masterData?.id,
        hsCode: masterData?.hsCode,
        active: masterData?.active,

      });
    }
  }, [data, masterData]);

  // From child table
  useEffect(() => {
    if (data) {
      setDefValue((prevDefValue) => ({
        ...prevDefValue,
        fiscalYear: childData?.[0]?.fiscalYear,

      }));
    }
  }, [data, childData]);






  const onSubmit = () => { };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
     
        <UMBreadCrumb lastName="view" pageName="VAT Structure" link="/super_admin/hk/vat-structure" />
 

      <div
        style={{
          padding: "20px 0px",
          marginTop: "0px",
        }}
      >
        <div style={{}}>
          <Form
            submitHandler={onSubmit}
            // resolver={yupResolver(createReceiveSchema)}
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
                  <FormInput
                    style={{
                      width: "100%",
                      align: "left",
                    }}
                    size="large"
                    name="hsCode"
                    label="HS Code: "
                    required
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
                  <FormInput
                    style={{
                      width: "100%",
                      align: "left",
                    }}
                    size="large"
                    name="fiscalYear"
                    label="Fiscal Year: "
                    required
                    disable

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
                  <FormRadioSelect
                    label="Status: "
                    name="active"
                    options={[
                      { value: 'true', label: "Active" },
                      { value: 'false', label: "InActive" },
                    ]}
                    disable

                  />

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

                  {childData ? (<div className="relative overflow-x-auto  sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="bg-orange-thead text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th className="px-2 py-2">
                            <input
                              type="checkbox"
                              disabled
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
                        {childData.map((item: any, index: number) => (
                          <tr key={index}>
                            <td>
                              <input
                                type="checkbox"
                                disabled
                                className="form-checkbox h-5 w-5 text-indigo-600"
                              />
                            </td>
                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.vatRateRefName}
                                disable
                              />
                            </td>
                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.tranSubTypeName}
                                disable
                              />
                            </td>
                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.vatRateTypeName}
                                disable
                              />
                            </td>
                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.prodTypeName}
                                disable
                              />
                            </td>
                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item && item.effectiveDate ? dayjs(item.effectiveDate).endOf('day').toISOString().split('T')[0] : ''}
                                disable
                              />


                            </td>
                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.cd}
                                disable
                              />
                            </td>
                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.rd}
                                disable
                              />
                            </td>
                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.sd}
                                disable
                              />
                            </td>
                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.vat}
                                disable
                              />
                            </td>
                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.ait}
                                disable
                              />
                            </td>
                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.at}
                                disable
                              />
                            </td>
                            <td>

                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.isFixedRate}
                                disable
                              />
                            </td>
                            <td>

                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.uomName}
                                disable
                              />
                            </td>
                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                }}
                                name=""
                                value={item?.fixedRate}
                                disable
                              />
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>) : (<Loading />)}
                  {/* form child end  */}
                </Col>
              </Row>

              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  // padding: "0px 40px",
                  alignItems: "center",
                }}
              >
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
                  <Link href={`/super_admin/hk/vat-structure/edit/${id}`}>
                    <DarazCommonButton >Edit</DarazCommonButton>
                  </Link>

                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ViewVat;
