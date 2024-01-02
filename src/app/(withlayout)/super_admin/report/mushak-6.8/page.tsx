"use client";
import React from "react";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import {
  useMushakSixEightQuery,
  useSixEightCompDropdownQuery,
  useSixEightBranchDropdownQuery,
  useSixEightStoreDropdownQuery,
  useSixEightVatDropdownQuery,
  useSixEightSupDropdownQuery,
  useSixEightDebitDropdownQuery
} from "@/redux/api/reportApi/mushakSixEightApi";
import { Col, Row, Image } from "antd";
import Form from "@/components/Forms/Form";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import { FilePdfOutlined } from "@ant-design/icons";
import "@react-pdf-viewer/core/lib/styles/index.css";
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
  const [selectedSupplierId, setselectedSupplierId] = useState(null);
  const [selectedDebitId, setselectedDebitId] = useState(null);
  const [companyParameter, setCompanyParameter] = useState(null);
  const [branchParameter, setBranchParameter] = useState(null);
  const [storeParameter, setStoreParameter] = useState(null);
  const [vatMonthParameter, setVatMonthParameter] = useState(null);
  const [supplierParameter, setSupplierParameter] = useState(null);
  const [debitParameter, setDebitParameter] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);
  const [pdfWindowOpened, setPdfWindowOpened] = useState(false);
  // query
  const query: Record<string, any> = {};
  // drop down data
  const { data: compdata } = useSixEightCompDropdownQuery({ ...{}, });
  const { data: branchdata } = useSixEightBranchDropdownQuery({ ...{}, });
  const { data: storedata } = useSixEightStoreDropdownQuery({  ...{}, });
  const { data: vatdata } = useSixEightVatDropdownQuery({  ...{}, });
  const { data: supplierdata } = useSixEightSupDropdownQuery({  ...{}, });
  const { data: debitdata } = useSixEightDebitDropdownQuery({  ...{}, });
  const companyOptions =
    compdata &&
    compdata?.result.filter((company:any)=>  company?.companyId!==null).map((company: any) => {
      return {
        label: company?.compName,
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
  const supplierOptions =
    supplierdata &&
    supplierdata?.result.filter((supplier:any)=>  supplier?.supplierId!==null).map((supplier: any) => {
      return {
        label: supplier?.supplierName,
        value: parseInt(supplier?.supplierId),
      };
    });
  const debitNoteOptions =
    debitdata &&
    debitdata?.result.filter((debit:any)=>  debit?.debitNoteId!==null).map((debit: any) => {
      return {
        label: debit?.debitNoteNo,
        value: parseInt(debit?.debitNoteId),
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
  const { data: reportData, refetch } = useMushakSixEightQuery({
    companyId: companyParameter,
    branchId: branchParameter,
    storeId: storeParameter,
    vatMonthId: vatMonthParameter,
    supplierId: supplierParameter,
    debitNoteId: debitParameter,
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
    if (selectedCompany == null || selectedBranch == null || selectedStore == null || selectedVatMonth == null || selectedSupplierId == null || selectedDebitId == null) {
      setShowReport(showReport);
      setShowMessage(true)
      setFetchDataTrigger(false);
    }else if(showReport== true){
      setCompanyParameter(selectedCompany)
      setBranchParameter(selectedBranch)
      setStoreParameter(selectedStore)
      setVatMonthParameter(selectedVatMonth)
      setSupplierParameter(selectedSupplierId)
      setDebitParameter(selectedDebitId)
      setShowReport(true)
      setShowMessage(false)
      setFetchDataTrigger(true)
    } else {
      setCompanyParameter(selectedCompany)
      setBranchParameter(selectedBranch)
      setStoreParameter(selectedStore)
      setVatMonthParameter(selectedVatMonth)
      setSupplierParameter(selectedSupplierId)
      setDebitParameter(selectedDebitId)
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
  const leftFive = musokData?.[0]?.fieldLeftFive;
  const leftSix = musokData?.[0]?.fieldLeftSix;
  const leftSeven = musokData?.[0]?.fieldLeftSeven;
  //Right side
  const rightOne = musokData?.[0]?.fieldRightOne;
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
    selectedSupplierId :any,
    selectedDebitId :any,
    ) => {
   console.log(selectedCompany, "pdf parameter");
   try {
     const response = await fetch(
       `http://192.168.10.10:8181/report/api/v1/mushak-six-eight/gen-pdf?companyId=${selectedCompany}&branchId=${selectedBranch}&storeId=${selectedStore}&vatMonthId=${selectedVatMonth}&supplierId=${selectedSupplierId}&debitNoteId=${selectedDebitId}`,
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
    fetchPdfData(selectedCompany,selectedBranch,selectedStore,selectedVatMonth,selectedSupplierId,selectedDebitId);
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
            <h2>Mushak Report 6.8</h2>
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
                        options={supplierOptions}
                        label="Supplier ID:  "
                        placeholder="Select supplier ID"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value: any) =>
                          setselectedSupplierId(value)
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
                          width: "90%",
                          position: "relative",
                          zIndex: 1,
                          textAlign: "left",
                        }}
                        name=""
                        options={debitNoteOptions}
                        label="Debit Note :  "
                        placeholder="Select Debit ID"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value: any) =>
                          setselectedDebitId(value)
                        }
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
                            <strong>ডেবিট নোট</strong>
                          </div>
                          <div>
                            <strong>
                              [বিধি ৪০ এর উপ-বিধি(১) এর দফা (ছ) দ্রষ্টব্য]
                            </strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-11 col-end-13 text-center">
                      <p className="font-bold">মূসক-৬.৮</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 grid-flow-col gap-0 border p-2">
                    <div className="col-start-1 col-end-3 flex">
                      <div className="flex flex-col">
                        <div className="overflow-hidden">
                          <strong>নিবন্ধিত ব্যক্তির নাম: </strong> {leftOne}
                        </div>
                        <div className="overflow-hidden">
                          <strong>নিবন্ধিত ব্যক্তির বিআইএন: </strong>
                          {leftTwo}
                        </div>
                        <div 
                        style={{marginBottom:"15px"}}>
                          <strong>চালানপত্র ইস্যুর ঠিকানা: </strong>
                          {leftThree}
                        </div>
                        <div >
                          <strong>ক্রেতা/গ্রহীতার নাম: </strong>
                          {leftFour}
                        </div>
                        <div >
                          <strong>ক্রেতা/গ্রহীতার বিআইএন: </strong>
                          {leftFive}
                        </div>
                        <div >
                          <strong>ক্রেতা/গ্রহীতার ঠিকানা: </strong>
                          {leftSix}
                        </div>
                      </div>
                    </div>
                    <div className="col-start-4 col-end-6 flex justify-end">
                      <div className="text-right flex flex-col">
                        <div className="overflow-hidden"
                           style={{marginTop:"45px"}}>
                          <strong>ডেবিট নোট নম্বর:</strong> {rightOne}
                        </div>
                        <div className="overflow-hidden">
                          <strong>ইস্যু তারিখ: </strong>
                          {formatDate(IssueDate)}
                        </div>
                        <div>
                          <strong>ইস্যু সময়: </strong>
                          {IssueTime}
                        </div>
                        <div>
                          <strong>যানবাহনের প্রকৃতি ও নম্বর: </strong>
                          {leftSeven}
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
                  কর চালান পত্রের নম্বর ও তারিখ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  ডেবিট নোট ইস্যুর কারণ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                   চালানপত্রে উল্লিখিত সরবরাহের মূল্য
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  চালান পত্রে উল্লিখিত সরবরাহের পরিমাণ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  চালান পত্রে উল্লিখিত সরবরাহের মূল্যসংযোজন করের পরিমাণ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  চালান পত্রে উল্লিখিত সরবরাহের সম্পূরক শুল্কের পরিমাণ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বৃদ্ধিকারী সমন্বয়ের সহিত সংশ্লিষ্ট মূল্য 
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বৃদ্ধিকারী সমন্বয়ের সহিত সংশ্লিষ্ট পরিমাণ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বৃদ্ধিকারী সমন্বয়ের সহিত সংশ্লিষ্ট সম্পূরক করের পরিমাণ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বৃদ্ধিকারী সমন্বয়ের সহিত সংশ্লিষ্ট সম্পূরক শুল্কের পরিমাণ
                </th>
              </tr>
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
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  (৯)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  (১০)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  (১১)
                </td>
              </tr>
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
                     <p>{item?.fieldTwo}</p> 
                     <p>{formatDate(item?.fieldTwoOne)}</p> 
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
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
                        textAlign: "right",
                      }}
                    >
                      {(item?.fieldSix)?.toFixed(2)}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      {item?.fieldSeven?.toFixed(2)}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      {item?.fieldEight?.toFixed(2)}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldNine}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      {item?.fieldTen?.toFixed(2)}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      {item?.fieldEleven?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan={11}>
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
                        <div className="grid mb-5">
                          <strong>১ পণ্য/সেবার মূসক ও সম্পূরক শুল্কসহ মূল্য: </strong>
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
export default MushakSixEight;
