"use client";
import React from "react";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import {
  useMushakSixTenQuery,
  useSixTenCompDropdownQuery,
  useSixTenBranchDropdownQuery,
  useSixTenStoreDropdownQuery,
  useSixTenVatDropdownQuery,
} from "@/redux/api/reportApi/mushakSixTenApi";
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

const MushakSixTen = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [pageSize2, setPageSize2] = useState(2);
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
  const { data: compdata } = useSixTenCompDropdownQuery({ ...{} });
  const { data: branchdata } = useSixTenBranchDropdownQuery({ ...{} });
  const { data: storedata } = useSixTenStoreDropdownQuery({ ...{} });
  const { data: vatdata } = useSixTenVatDropdownQuery({ ...{} });
  const companyOptions =
    compdata &&
    compdata?.result.filter((company:any)=>  company?.companyId!==null).map((company: any) => {
      return {
        label: company?.companyName,
        value: parseInt(company?.companyId),
      }});
  const branchOptions =
    branchdata &&
    branchdata?.result.filter((branch:any)=>  branch?.branchId!==null).map((branch: any) => {
      return {
        label: branch?.name,
        value: parseInt(branch?.branchId),
      }});
  const storeOptions =
    storedata &&
    storedata?.result.filter((store:any)=>  store?.storeId!==null).map((store: any) => {
      return {
        label: store?.sl_name,
        value: parseInt(store?.storeId),
      }});
  const vatMonthOptions =
    vatdata &&
    vatdata?.result.filter((vatmonth:any)=>  vatmonth?.vatMonthId!==null).map((vatmonth: any) => {
      return {
        label: vatmonth?.vm_info,
        value: parseInt(vatmonth?.vatMonthId),
      }});
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
  const { data: reportData, refetch } = useMushakSixTenQuery({
    companyId: companyParameter,
    branchId: branchParameter,
    storeId: storeParameter,
    vatMonthId: vatMonthParameter,
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
    if (
      selectedCompany == null ||
      selectedBranch == null ||
      selectedStore == null ||
      selectedVatMonth == null
    ) {
      setShowReport(showReport);
      setShowMessage(true)
      setFetchDataTrigger(false);
    } else if (showReport == true) {
      setCompanyParameter(selectedCompany);
      setBranchParameter(selectedBranch);
      setStoreParameter(selectedStore);
      setVatMonthParameter(selectedVatMonth);
      setShowReport(true);
      setShowMessage(false)
      setFetchDataTrigger(true);
    } else {
      setCompanyParameter(selectedCompany);
      setBranchParameter(selectedBranch);
      setStoreParameter(selectedStore);
      setVatMonthParameter(selectedVatMonth);
      setShowReport(true);
      setShowMessage(false)
      setFetchDataTrigger(true);
    }
  };
  //table data extracting from hook
  const musokData = reportData?.result?.content;
  const itemData = musokData?.[0]?.ka;
  const itemData2 = musokData?.[0]?.kha;
  const itemTotalData = musokData?.[0]?.ka?.length;
  const itemTotalData2 = musokData?.[0]?.kha?.length;
  console.log(itemTotalData, "child Data");
  // Left Side data
  const leftOne = musokData?.[0]?.fieldLeftOne;
  const leftTwo = musokData?.[0]?.fieldLeftTwo;
  console.log(musokData, "row data");
  // Date format
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-4);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };
  // pagination One
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = itemData?.slice(indexOfFirstItem, indexOfLastItem);
  //pagination two
  const indexOfLastItem2 = currentPage2 * pageSize2;
  const indexOfFirstItem2 = indexOfLastItem2 - pageSize2;
  const currentItems2 = itemData2?.slice(indexOfFirstItem2, indexOfLastItem2);
  console.log(currentItems, "mushok Data");
  //page change
  const handlePageChange = async (pageNumber: any, pageSize: any) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };
  const handlePageChange2 = async (pageNumber: any, pageSize: any) => {
    setCurrentPage2(pageNumber);
    setPageSize2(pageSize);
  };
  // showing Pdf
  const fetchPdfData = async (
    selectedCompany: any,
    selectedBranch: any,
    selectedStore: any,
    selectedVatMonth: any
  ) => {
    console.log(selectedCompany, "pdf parameter");
    try {
      const response = await fetch(
        `http://192.168.10.10:8181/report/api/v1/mushak-six-ten/gen-pdf?companyId=${selectedCompany}&branchId=${selectedBranch}&storeId=${selectedStore}&vatMonthId=${selectedVatMonth}`,
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
    fetchPdfData(
      selectedCompany,
      selectedBranch,
      selectedStore,
      selectedVatMonth
    );
  };
  //Table design and grid data return
  return (
    <>
      <div
        className="container mx-auto px-2 text-sm/[19px]"
        style={{ width: "100%", overflowX: "auto" }}
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
            <h2>Mushak Report 6.10</h2>
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
                          width: "90%",
                          position: "relative",
                          zIndex: 1,
                          textAlign: "left",
                        }}
                        name=""
                        options={companyOptions}
                        label="Company Name:  "
                        placeholder="Select Company"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value: any) => setselectedCompany(value)}
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
                        options={branchOptions}
                        label="Company Branch:  "
                        placeholder="Select Branch"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value: any) => setselectedBranch(value)}
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
                        options={storeOptions}
                        label="Store Name:  "
                        placeholder="Select Store"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value: any) => setselectedStore(value)}
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={4}
                      style={{
                        paddingLeft: "10px",
                        marginBottom: "20px",
                        minWidth: "10px",
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
                        options={vatMonthOptions}
                        label="VAT Month:  "
                        placeholder="Select Vat Month"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value: any) => setselectedVatMonth(value)}
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={5}
                      style={{
                        marginTop: "10px",
                        textAlign: "right",
                        paddingLeft: "20px",
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
                            style={{ width: "70px" }}
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
                            <strong>
                              {" "}
                              দুই লক্ষ টাকার বেশি মূল্য মানের ক্রয়-বিক্রয়
                              চালানপত্রের তথ্য
                            </strong>
                          </div>
                          <div>
                            <strong>[বিধি ৪২ এর উপ-বিধি(১) দ্রষ্টব্য]</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-11 col-end-13 text-center">
                      <p className="font-bold">মূসক-৬.১০</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 grid-flow-col gap-0 border p-2">
                    <div className="col-start-1 col-end-3 flex">
                      <div className="flex flex-col">
                        <div>
                          <strong>নিবন্ধিত/তালিকাভুক্ত ব্যক্তির নাম: </strong>{" "}
                          {leftOne}
                        </div>
                        <div className="mb-5 ">
                          <strong>নিবন্ধিত ব্যক্তির বিআইএন: </strong>
                          {leftTwo}
                        </div>
                        <div>
                          <strong>অংশ-ক ক্রয় হিসাব তথ্য </strong>
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
                  ক্রয় চালানপত্র নং
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  ক্রয় ইস্যুর তারিখ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  ক্রয় মূল্য (টাকায়)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  ক্রয় বিক্রেতার নাম
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  ক্রয় বিক্রেতার ঠিকানা
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  ক্রয় বিক্রেতার বিআইএন/জাতীয় পরিচয়পত্র নং
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
                      {item?.fieldKaOne}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldKaTwo}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      {formatDate(item?.fieldKaThree)}
                    </td>

                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      {item?.fieldKaFour}
                    </td>

                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldKaFive}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldKaSix}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldKaSeven}
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
              marginBottom: "5px",
            }}
          />
        ) : (
          ""
        )}
        {showReport ? (
          <div className="grid grid-cols-5 grid-flow-col gap-0 border p-2 mt-2">
            <div className="col-start-1 col-end-3 flex">
              <div className="flex flex-col">
                <div>
                  <strong>অংশ-খ বিক্রয় হিসাব তথ্য </strong>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            border: "1px solid #ccc",
            marginTop: "2px",
          }}
        >
          {showReport ? (
            <tbody>
              {/* another table */}
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
                  বিক্রয় চালানপত্র নং
                </th>

                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বিক্রয় ইস্যুর তারিখ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বিক্রয় মূল্য (টাকায়)
                </th>

                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বিক্রয় বিক্রেতার নাম
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বিক্রয় বিক্রেতার ঠিকানা
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বিক্রয় ক্রেতার বিআইএন/জাতীয় পরিচয়পত্র নং
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
              </tr>
              {currentItems2 &&
                currentItems2.map((item: any, index: any) => (
                  <tr key={index} className="border-t border-gray-200">
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldKhaOne}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldKhaTwo}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      {formatDate(item?.fieldKhaThree)}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "right",
                      }}
                    >
                      {item?.fieldKhaFour}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldKhaFive}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldKhaSix}
                    </td>
                    <td
                      style={{
                        border: "1px solid #ccc",
                        padding: "8px",
                        textAlign: "left",
                      }}
                    >
                      {item?.fieldKhaSeven}
                    </td>
                  </tr>
                ))}
              <tr>
                <td colSpan={7}>
                  <div className="grid grid-cols-3 grid-flow-col gap-2 border p-2">
                    <div className="col-start-1 col-end-4 flex flex-col">
                      <div className="grid   text-sm/[26px] overflow-hidden">
                        <p>
                          <strong>দায়িত্বপ্রাপ্ত ব্যাক্তির স্বাক্ষর:</strong>
                        </p>
                        <p>
                          <strong>নাম: </strong>
                        </p>

                        <div className="grid mb-5">
                          <strong>তারিখ: </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : null}
        </table>
        {showReport ? (
          <Pagination
            current={currentPage2}
            pageSize={pageSize2}
            total={itemTotalData2}
            onChange={handlePageChange2}
            showSizeChanger
            onShowSizeChange={handlePageChange2}
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
export default MushakSixTen;
