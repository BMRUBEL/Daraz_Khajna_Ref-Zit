"use client";
import React from "react";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import {
    useMushakChakKaQuery,
    useChakKaCompDropdownQuery,
    useChakKaBranchDropdownQuery,
    useChakKaStoreDropdownQuery,
    useChakKaVatDropdownQuery,
    useChakKaFromDateQuery,
    useChakKaToDateQuery,
} from "@/redux/api/reportApi/mushakChak-KaApi";
import { Col, Row, Image } from "antd";
import Form from "@/components/Forms/Form";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Loading from "@/app/loading";
import Link from "next/link";
import { FilePdfOutlined } from "@ant-design/icons";
import "@react-pdf-viewer/core/lib/styles/index.css";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import DarazReportButton from "@/components/ui/DRZReportButton";
interface TableProps {
  columns: string[];
  rows: Record<string, any>[];
}

const MushakSixEight = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedCompany, setselectedCompany] = useState(null);
  const [selectedBranch, setselectedBranch] = useState(null);
  const [selectedStore, setselectedStore] = useState(null);
  const [selectedVatMonth, setselectedVatMonth] = useState(null);
  const [companyParameter, setCompanyParameter] = useState(null);
  const [branchParameter, setBranchParameter] = useState(null);
  const [storeParameter, setStoreParameter] = useState(null);
  const [vatMonthParameter, setVatMonthParameter] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);
  const [pdfWindowOpened, setPdfWindowOpened] = useState(false);

  // query
  const query: Record<string, any> = {};
  // drop down data
  const { data: compdata } = useChakKaCompDropdownQuery({ ...{}, });
  const { data: branchdata } = useChakKaBranchDropdownQuery({ ...{}, });
  const { data: storedata } = useChakKaStoreDropdownQuery({  ...{}, });
  const { data: vatdata } = useChakKaVatDropdownQuery({  ...{}, });
  const companyOptions =
    compdata &&
    compdata?.result.filter((company:any)=>  company?.companyId!==null).map((company: any) => {
      return {
        label: company?.companyName,
        value: parseInt(company?.companyId),
      };
    });
  const branchOptions =
    branchdata &&
    branchdata?.result.filter((branch:any)=>  branch?.branchId!==null).map((branch: any) => {
      return {
        label: branch?.name,
        value: parseInt(branch?.branchId),
      };
    });
  const storeOptions =
    storedata &&
    storedata?.result.filter((store:any)=>  store?.storeId!==null).map((store: any) => {
      return {
        label: store?.sl_name,
        value: parseInt(store?.storeId),
      };
    });
  const vatMonthOptions =
    vatdata &&
    vatdata?.result.filter((vatmonth:any)=>  vatmonth?.vatMonthId!==null).map((vatmonth: any) => {
      return {
        label: vatmonth?.vm_info,
        value: parseInt(vatmonth?.vatMonthId),
      };
    });
  //Need this for form field
  const onSubmit = () => {};
  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  //get grid view data
  const { data: reportData, refetch } = useMushakChakKaQuery({
    companyId: companyParameter,
    branchId: branchParameter,
    storeId: storeParameter,
    vatMonthId: vatMonthParameter,
    size: pageSize,
    page: currentPage,
  });
   // Effect to fetch data when the trigger is set
   useEffect(() => {
    if (fetchDataTrigger) {
      refetch();
      setFetchDataTrigger(false);
    }
  }, [fetchDataTrigger, refetch]);
  // Handler for fetching data
  const handleFetchData = () => {
    if (selectedCompany == null || selectedBranch == null || selectedStore == null || selectedVatMonth == null ) {
      setShowReport(showReport);
      setShowMessage(true)
      setFetchDataTrigger(false);
    }else if(showReport== true){
      setCompanyParameter(selectedCompany)
      setBranchParameter(selectedBranch)
      setStoreParameter(selectedStore)
      setVatMonthParameter(selectedVatMonth)
      setShowReport(true)
      setShowMessage(false)
      setFetchDataTrigger(true)
    } else {
      setCompanyParameter(selectedCompany)
      setBranchParameter(selectedBranch)
      setStoreParameter(selectedStore)
      setVatMonthParameter(selectedVatMonth)
      setShowReport(true)
      setShowMessage(false)
      setFetchDataTrigger(true)
    }
  };
 
//table data extracting from hook
  const musokData = reportData?.result?.content;
  const itemData = musokData?.[0]?.items;
  const itemTotalData = musokData?.[0]?.items?.length;
  console.log(itemTotalData, "child Data");
  // subTotal row data
  const rightTwo = musokData?.[0]?.fieldRightTwo;
  const dateTime = new Date(rightTwo);
  const IssueDate = dateTime.toLocaleDateString();
  const IssueTime = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  console.log(musokData, "row data");
  // Date format
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-4);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  //Date change
  const handleDateChange =()=>{

  }
  // pagination
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = itemData?.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems, "mushok Data");
  //page change
  const handlePageChange = async (pageNumber: any, pageSize: any) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };
// showing Pdf
  const fetchPdfData = async (
    selectedCompany:any,
    selectedBranch:any,
    selectedStore :any,
    selectedVatMonth :any,
    ) => {
   console.log(selectedCompany, "pdf parameter");
   try {
     const response = await fetch(
       `http://192.168.10.10:8181/report/api/v1/mushak-six-five/gen-pdf?companyId=${selectedCompany}&branchId=${selectedBranch}&storeId=${selectedStore}&vatMonthId=${selectedVatMonth}`,
       {
         headers: {
           Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjgsImVtYWlsIjoicm9iaXVsQHppdC5jb20iLCJzdWIiOiJyb2JpdWxAeml0LmNvbSIsImlhdCI6MTY5ODk5MjcyMywiZXhwIjoxNzMwNTI4NzIzfQ.ED6tCBxtBXVjFlfgSp-aRp7u_S4_d1nFfnSMcNpQYus"}`,
         },
       }
     );

     if (!response.ok) {
       throw new Error("Failed to fetch PDF");
     }

     const pdfBlob = await response.blob();
     const pdfUrl: any = URL.createObjectURL(pdfBlob);
     setPdfUrl(pdfUrl);

     setPdfWindowOpened(true);
   } catch (error) {
     console.error("Error fetching PDF:", error);
   }
 };

 useEffect(() => {
   if (pdfUrl && pdfWindowOpened) {
    const newTab = window.open(pdfUrl, "_blank");
    if(newTab){
      newTab.focus();
    }else{
      window.location.href = pdfUrl;
    }
   }
 }, [pdfUrl, pdfWindowOpened]);

 //pdf handler
 const handleFetchPdf = () => {
    fetchPdfData(selectedCompany,selectedBranch,selectedStore,selectedVatMonth);
  };
//Table design and grid data return
  return (
    <>
      <div className="container mx-auto px-2 text-sm/[19px]"
      style={{ width: '100%',
      overflowX: 'auto',}}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
          }}
        >
          <div
            style={{
              marginTop: "15px",
              boxSizing: "border-box",
            }}
          >
            <h2>Mushak Report Chak-KA</h2>
          </div>
          {showReport ? (
            <div>
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 10px 5px 10px",
                  backgroundColor: "#C8091C",
                  border: "none",
                  cursor: "pointer",
                  color: "white",
                  borderRadius: "5px",
                }}
                onClick={handleFetchPdf}
              >
                <FilePdfOutlined style={{ fontSize: "25px" }} />
                <span style={{ marginLeft: "10px" }}>PDF</span>
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            border: "1px solid #ccc",
          }}
        >
          {/* <thead> */}
          <tr>
            <td
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "left",
                lineHeight: 2,
              }}
              colSpan={21}
            >
              <div
                style={{
                  borderRadius: "10px",
                  border: "1px solid #e9e8e8",
                  boxSizing: "border-box",
                }}
              >
                <Form submitHandler={onSubmit}>
                  <div
                    style={{
                      padding: "2px 0px 0px 12px",
                      marginTop: "1px",
                      overflowX: "auto",
                    }}
                  ></div>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: "100%",
                    }}
                  >
                    <Col
                      className="gutter-row"
                      span={4}
                      style={{
                        paddingLeft: "10px",
                        marginBottom: "20px",
                        minWidth: "0",
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "100%",
                          position: "relative",
                          zIndex: 1,
                          textAlign: "left",
                        }}
                        name=""
                        options={companyOptions}
                        label="Company:  "
                        placeholder="Select Company"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value: any) =>
                          setselectedCompany(value)
                        }
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={4}
                      style={{
                        paddingLeft: "10px",
                        marginBottom: "20px",
                        minWidth: "0",
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "100%",
                          position: "relative",
                          zIndex: 1,
                          textAlign: "left",
                        }}
                        name=""
                        options={branchOptions}
                        label="Company Branch:  "
                        placeholder="Select Branch"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value: any) =>
                          setselectedBranch(value)
                        }
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={4}
                      style={{
                        paddingLeft: "10px",
                        marginBottom: "20px",
                        minWidth: "0",
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "100%",
                          position: "relative",
                          zIndex: 1,
                          textAlign: "left",
                        }}
                        name=""
                        options={storeOptions}
                        label="Store Name:  "
                        placeholder="Select Store"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value: any) =>
                          setselectedStore(value)
                        }
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={4}
                      style={{
                        paddingLeft: "10px",
                        marginBottom: "20px",
                        minWidth: "0",
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "100%",
                          position: "relative",
                          zIndex: 1,
                          textAlign: "left",
                        }}
                        name=""
                        options={vatMonthOptions}
                        label="VAT Month:  "
                        placeholder="Select Vat Month"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value: any) =>
                          setselectedVatMonth(value)
                        }
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={4}
                      style={{
                        paddingLeft: "10px",
                        marginBottom: "20px",
                        minWidth: "0",
                      }}
                    >
                       <FormDatePicker
                  name="transactionDate"
                  label="From Date:"
                  onChange={handleDateChange}
                  required
                />
                    </Col>

                    <Col
                      className="gutter-row"
                      span={4}
                      style={{
                        marginTop: "10px",
                        textAlign: "center",
                      }}
                    >
                  <DarazReportButton onClick={handleFetchData}>
                      Veiw Report
                      </DarazReportButton>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      alignItems: "center",
                      minWidth: "100%",
                    }}
                  >
                    <Col
                      className="gutter-row"
                      span={4}
                      style={{
                        paddingLeft: "10px",
                        marginBottom: "20px",
                        minWidth: "0",
                      }}
                    >
                        <FormDatePicker
                  name="transactionDate"
                  label="To Date:"
                  onChange={handleDateChange}
                  required
                />
                    </Col>
                  </Row>
                </Form>
              </div>
              {showMessage ? (
                <div style={{
                  color:"red",
                  textAlign:"center",
                  width:"50%",
                  marginLeft:"250px",
                  fontSize:"20px"
                }}><p >***Select all the field to view report***</p></div>
              ): (null)}
            </td>
          </tr>
          {showReport ? (
            <tbody>
              <tr>
                <td colSpan={12}>
                  <div className="grid grid-cols-12 grid-flow-col gap-0  border p-3 mb-5">
                    <div className="col-start-1 col-end-4 flex flex-col"></div>
                    <div className="col-start-4 col-end-10 text-center">
                      <div className="grid grid-cols-5 grid-flow-col gap-0">
                      
                        <div className="col-start-1 col-end-6 text-center">
                         
                          <div className="grid mb-4">
                            <strong>ছক-ক</strong>
                          </div>
                          <div>
                            <strong>কেন্দ্রীয় ইউনিট হইতে বিক্রয় ইউনিটে স্থানান্তরিত পণ্য/সেবা বিবরণী</strong>
                          </div>
                          <div>
                            <strong>
                              [ বিধি ৭ দ্রষ্টব্য ]
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr
                style={{
                  backgroundColor: "rgb(253, 249, 216)",
                  textAlign: "left",
                }}
              >
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  ক্রমিক সংখ্যা
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  কেন্দ্রীয় নিবন্ধিত ব্যক্তির নাম ও বিআইএন
                </th>
                
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  পণ্য/সেবা প্রেরণকারী ইউনিটের নাম ও ঠিকানা
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                   পণ্য/সেবা গ্রহীতা ইউনিটের নাম ও ঠিকানা
                </th>
                
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  স্থানান্তর চালানপত্র বইয়ের নম্বর ও ইস্যুর তারিখ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  পণ্য/সেবা স্থানান্তর চালানপত্র ফর্ম “মূসক-৬.৫” নম্বর ও তারিখ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  স্থানান্তরিত পণ্য বা সেবার বিবরণ (প্রযোজ্য ক্ষেত্রে সুনির্দিষ্ট ব্র্যান্ড নামসহ)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  স্থানান্তরিত পণ্য বা সেবার পরিমাণ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  স্থানান্তরিত পণ্য বা সেবার কর ব্যতিত
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  স্থানান্তরিত পণ্য বা সেবার প্রযোজ্য করের পরিমাণ
                </th>
              </tr>
              {/* </thead> */}
              <tr className="border-t border-gray-200">
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (১)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  (২)
                </td>

                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  
                </td>

                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  (৩)
                </td>

                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  (৪)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (৫)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                 
                </td>

                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  (৬)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  (৭)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  (৮)
                </td>
              </tr>
              {/* table */}

              {currentItems &&
                currentItems.map((item: any, index: any) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldOne}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldTwo}
                    </td>

                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      {item?.fieldThree}
                    </td>

                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      {item?.fieldFour}
                    </td>

                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldFive}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldFive}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldFive}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldFive}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldFive}
                    </td>
                  </tr>
                ))}
            </tbody>
          ) : (
            <tr>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "center",
                  lineHeight: 2,
                }}
                colSpan={21}
              >
                <div className="border p-4 mb-5" style={{ height: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div style={{ paddingTop: "50px" }}>
                      <Image
                        src={"../../../../../search2img.png"}
                        alt="Img"
                        style={{ width: "190px", transform: "rotate(350deg)" }}
                        preview={false}
                      />
                    </div>
                    <div
                      style={{
                        fontSize: "50px",
                        paddingLeft: "25px",
                        paddingTop: "10px",
                      }}
                    >
                      You Don't Find Any Result
                      <div style={{ fontSize: "22px" }}>
                        Fill up All Field And View Your Report
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          )}
        </table>
        {showReport ? (
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={itemTotalData}
            onChange={handlePageChange}
            showSizeChanger
            onShowSizeChange={handlePageChange}
            style={{
              marginTop: "16px",
              textAlign: "right",
              marginBottom: "20px",
            }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MushakSixEight;
