"use client";
import React from "react";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import {
    useMushakSixSixQuery,
    useSixSixCompDropdownQuery,
    useSixSixBranchDropdownQuery,
    useSixSixStoreDropdownQuery,
    useSixSixVatDropdownQuery,
    useSixSixTransDropdownQuery,
} from "@/redux/api/reportApi/mushakSixSixApi";
import { Col, Row, Image } from "antd";
import Form from "@/components/Forms/Form";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Loading from "@/app/loading";
import Link from "next/link";
import { FilePdfOutlined } from "@ant-design/icons";
import "@react-pdf-viewer/core/lib/styles/index.css";
import DarazReportButton from "@/components/ui/DRZReportButton";
interface TableProps {
  columns: string[];
  rows: Record<string, any>[];
}

const MushakSixFive = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedCompany, setselectedCompany] = useState(null);
  const [selectedBranch, setselectedBranch] = useState(null);
  const [selectedStore, setselectedStore] = useState(null);
  const [selectedVatMonth, setselectedVatMonth] = useState(null);
  const [selectedTransferId, setselectedTransferId] = useState(null);
  const [companyParameter, setCompanyParameter] = useState(null);
  const [branchParameter, setBranchParameter] = useState(null);
  const [storeParameter, setStoreParameter] = useState(null);
  const [vatMonthParameter, setVatMonthParameter] = useState(null);
  const [transferIdParameter, setTransferIdParameter] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);
  const [pdfWindowOpened, setPdfWindowOpened] = useState(false);

 
  // query
  const query: Record<string, any> = {};
  // drop down data
  const { data: compdata } = useSixSixCompDropdownQuery({ ...{}, });
  const { data: branchdata } = useSixSixBranchDropdownQuery({ ...{}, });
  const { data: storedata } = useSixSixStoreDropdownQuery({  ...{}, });
  const { data: vatdata } = useSixSixVatDropdownQuery({  ...{}, });
  const { data: transdata } = useSixSixTransDropdownQuery({  ...{}, });
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
  const transferOptions =
    transdata &&
    transdata?.result.filter((transfer:any)=>  transfer?.transferMasterId!==null).map((transfer: any) => {
      return {
        label: transfer?.transferMasterId,
        value: parseInt(transfer?.transferMasterId),
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
  const { data: reportData, refetch } = useMushakSixSixQuery({
    companyId: companyParameter,
    branchId: branchParameter,
    storeId: storeParameter,
    vatMonthId: vatMonthParameter,
    transferId: transferIdParameter,
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
    if (selectedCompany == null || selectedBranch == null || selectedStore == null || selectedVatMonth == null || selectedTransferId == null ) {
      setShowReport(showReport);
      setShowMessage(true)
      setFetchDataTrigger(false);
    }else if(showReport== true){
      setCompanyParameter(selectedCompany)
      setBranchParameter(selectedBranch)
      setStoreParameter(selectedStore)
      setVatMonthParameter(selectedVatMonth)
      setTransferIdParameter(selectedTransferId)
      setShowReport(true)
      setShowMessage(false)
      setFetchDataTrigger(true)
    } else {
      setCompanyParameter(selectedCompany)
      setBranchParameter(selectedBranch)
      setStoreParameter(selectedStore)
      setVatMonthParameter(selectedVatMonth)
      setTransferIdParameter(selectedTransferId)
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
  const leftOne = musokData?.[0]?.fieldLeftOne;
  const leftTwo = musokData?.[0]?.fieldLeftTwo;
  const leftThree = musokData?.[0]?.fieldLeftThree;
  const leftFour = musokData?.[0]?.fieldLeftFour;
  //Right side
  const rightOne = musokData?.[0]?.fieldRightOne;
  const rightTwo = musokData?.[0]?.fieldRightTwo;
  const rightFour = musokData?.[0]?.fieldRightFour;
  const dateTime = new Date(rightTwo);
  const IssueDate = dateTime.toLocaleDateString();
  const IssueTime = dateTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  // Subtotal Row data
  const subTotal = reportData?.result?.subTotal;
  const subTotalThree = subTotal?.subTotalThree;
  const subTotalFour = subTotal?.subTotalFour;
  console.log(musokData, "row data");
  // Date format
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-4);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
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
    selectedTransferId :any,
    ) => {
   console.log(selectedCompany, "pdf parameter");
   try {
     const response = await fetch(
       `http://192.168.10.10:8181/report/api/v1/mushak-six-five/gen-pdf?companyId=${selectedCompany}&branchId=${selectedBranch}&storeId=${selectedStore}&vatMonthId=${selectedVatMonth}&transferMasterId=${selectedTransferId}`,
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
    fetchPdfData(selectedCompany,selectedBranch,selectedStore,selectedVatMonth,selectedTransferId);
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
            <h2>Mushak Report 6.6</h2>
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
                      <DRZSelectField
                        style={{
                          width: "90%",
                          position: "relative",
                          zIndex: 1,
                          textAlign: "left",
                        }}
                        name=""
                        options={transferOptions}
                        label="Transfer ID:  "
                        placeholder="Select transfer ID"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value: any) =>
                          setselectedTransferId(value)
                        }
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
                        <div className="col-start-1 col-end-2 overflow-hidden text-right">
                          <Image
                            src={"../../../../../govtlogo.png"}
                            alt="Img"
                            style={{ width: "75px" }}
                            preview={false}
                          />
                        </div>
                        <div className="col-start-2 col-end-6 text-center">
                          <div>
                            <strong className="text-center">
                              গণপ্রজাতন্ত্রী বাংলাদেশ সরকার
                            </strong>
                          </div>
                          <div className="grid mb-8">
                            <strong>জাতীয় রাজস্ব বোর্ড</strong>
                          </div>
                          <div>
                            <strong> উৎস কর কর্তন সনদপত্র</strong>
                          </div>
                          <div>
                            <strong>
                              [বিধি ৪০ এর উপ-বিধি(১) এর দফা (চ) দ্রষ্টব্য]
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-11 col-end-13 text-center">
                      <p className="font-bold">মূসক-৬.৬</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 grid-flow-col gap-0 border p-2">
                    <div className="col-start-1 col-end-3 flex">
                      <div className="flex flex-col">
                        <div className="overflow-hidden">
                          <strong>উৎস কর কর্তনকারী সত্তার নাম: </strong> {leftOne}
                        </div>
                        <div className="overflow-hidden">
                          <strong>উৎস কর কর্তনকারী সত্তার ঠিকানা: </strong>
                          {leftTwo}
                        </div>
                        <div>
                          <strong>উৎস কর কর্তনকারী সত্তার বিআইএন(প্রযোজ্য ক্ষেত্রে): </strong>
                          {leftThree}
                        </div>
                        <div>
                          <strong>উৎস কর কর্তন সনদপত্র নং: </strong>
                          {leftFour}
                        </div>
                      </div>
                    </div>
                    <div className="col-start-4 col-end-6 flex justify-end">
                      <div className="text-right flex flex-col">
                        
                        <div className="overflow-hidden">
                          <strong>জারির তারিখ: </strong>
                          {formatDate(IssueDate)}
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
                 সরবরাহকারীর নাম
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                    সরবরাহকারীর বিআইএন
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                   সংশ্লিষ্ট কর চালানপত্র নম্বর
                </th>
                
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
               সংশ্লিষ্ট কর চালানপত্র ইস্যুর তারিখ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
               মোট সরবরাহ মূল্য (টাকায়)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
               মূসকের পরিমান (টাকায়)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
               উৎসে কর্তরকৃত মূসকের পরিমান (টাকায়)
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
                    textAlign: "center",
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
                    
                  </tr>
                ))}

              {/* Total */}

              
              <tr>
                <td colSpan={8}>
                  <div className="grid grid-cols-3 grid-flow-col gap-2 border p-2">
                    <div className="col-start-1 col-end-4 flex flex-col">
                      <div className="grid   text-sm/[26px] overflow-hidden">
                        <p>
                          <strong>
                            প্রতিষ্ঠানের দায়িত্বপ্রাপ্ত ব্যাক্তির নাম: 
                          </strong>
                        </p>
                        <p>
                          <strong>পদবী: </strong>
                        </p>
                        <strong>স্বাক্ষর: </strong>
                        <div className="grid mb-5">
                          <strong>সিল: </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
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

export default MushakSixFive;