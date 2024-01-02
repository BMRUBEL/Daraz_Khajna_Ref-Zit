"use client";
import React from "react";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import {
    useMushakFourFiveQuery,
    useCompanyFourFiveDropdownQuery,
    useBranchFourFiveDropdownQuery,
    useStoreFourFiveDropdownQuery,
    useVatMonthFourFiveDropdownQuery,
} from "@/redux/api/reportApi/mushakFourFiveApi";
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
const MushakFourFive = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
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
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);
  const [pdfWindowOpened, setPdfWindowOpened] = useState(false);

 // query
 const query: Record<string, any> = {};
  // drop down data
  const { data: compdata } = useCompanyFourFiveDropdownQuery({ ...{}, });
  const { data: branchdata } = useBranchFourFiveDropdownQuery({ ...{}, });
  const { data: storedata } = useStoreFourFiveDropdownQuery({  ...{}, });
  const { data: vatdata } = useVatMonthFourFiveDropdownQuery({  ...{}, });

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
    storedata?.result.filter((store:any)=>  store?.storeId !==null).map((store: any) => {
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
 

  const fetchPdfData = async (
    selectedCompany:any,
    selectedBranch:any,
    selectedStore:any,
    selectedVatMonth:any,
    
  ) => {
    console.log(selectedVatMonth, "pdf parameter");
    try {
      const response = await fetch(
        `http://192.168.10.10:8181/report/api/v1/mushak-six-one/gen-pdf?vatMonthId=${selectedVatMonth}&storeId=${selectedStore}`,
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
      const pdfUrl:any = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);

      setPdfWindowOpened(true);
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  useEffect(() => {
    if (pdfUrl && pdfWindowOpened) {
      const newWindow:any = window.open();
      const newTab = window.open(pdfUrl, "_blank");
      if(newTab){
        newTab.focus();
      }else{
        window.location.href = pdfUrl;
      }
    }
  }, [pdfUrl, pdfWindowOpened]);
  //get grid view data
  const { data: reportData, refetch } = useMushakFourFiveQuery({
   companyId: companyParameter,
   branchId: branchParameter,
   storeId: storeParameter,
   vatMonthId: vatMonthParameter,
    size: pageSize,
    page: currentPage,
  });
  // Handler for fetching data
  const handleFetchData = () => {
    if (selectedCompany == null || selectedBranch == null || selectedStore == null || selectedVatMonth == null) {
      setShowReport(showReport);
      setFetchDataTrigger(false);
    }else if(showReport== true){
      setCompanyParameter(selectedCompany)
      setBranchParameter(selectedBranch)
      setStoreParameter(selectedStore)
      setVatMonthParameter(selectedVatMonth)
      setShowReport(true)
      setFetchDataTrigger(true)
    } else {
      setCompanyParameter(selectedCompany)
      setBranchParameter(selectedBranch)
      setStoreParameter(selectedStore)
      setVatMonthParameter(selectedVatMonth)
      setShowReport(true)
      setFetchDataTrigger(true)
    }
  };
  // Effect to fetch data when the trigger is set
  useEffect(() => {
    if (fetchDataTrigger) {
      refetch();
      setFetchDataTrigger(false);
    }
  }, [fetchDataTrigger, refetch]);

  const handleFetchPdf = () => {
    fetchPdfData(selectedCompany, selectedBranch, selectedStore, selectedVatMonth);
  };
  const musokData = reportData?.result?.content;
  const itemData = musokData?.[0]?.items;
  const itemLength = itemData?.lengths;

  console.log(musokData, "row data");
 
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
  // Date format
  const formatDate = (dateString: any) => {
    const date = new Date(dateString); 
    const year = date.getFullYear().toString().slice(-2); 
    const month = ("0" + (date.getMonth() + 1)).slice(-2); 
    const day = ("0" + date.getDate()).slice(-2); 
    return `${year}-${month}-${day}`; 
  };
  // pagination
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = itemData?.slice(indexOfFirstItem, indexOfLastItem);
  console.log(
    indexOfFirstItem,
    "first item",
    indexOfLastItem,
    "last item",
    currentPage,
    "current page"
  );
  console.log(currentItems, "mushok Data");

  const handlePageChange = async (pageNumber: any, pageSize: any) => {
    console.log("current page", pageNumber, "page size", pageSize);
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
  };

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
            <h2>Mushak Report 4.5</h2>
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
                        paddingLeft: "20px",
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
                      <div className="col-start-1 col-end-2 overflow-hidden text-center">
                      <Image
                        src={('../../../../../govtlogo.png')}
                        alt="Img"
                        style={{ width: "70px" }}
                        preview={false}
                      />
                      </div>
                      <div className="col-start-2 col-end-5 text-center">
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
                            দুর্ঘটনায় ক্ষতিগ্রস্ত বা ধ্বংসপ্রাপ্ত পণ্য নিষ্পত্তির আবেদনপত্র 
                          </strong>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                  <div className="col-start-11 col-end-13 text-center">
                    <p className="font-bold">মূসক-৪.৫</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 grid-flow-col gap-2 border p-4">
                  <div className="col-start-1 col-end-3 flex">
                    <div className="col-start-1 col-end-4 flex flex-col">
                      <div className="overflow-hidden">
                        <strong>নিবন্ধিত বা তালিকাভুক্ত ব্যক্তির নামঃ</strong> বন্ধর স্টিল
                        ইন্ডাস্ট্রিজ লিমিটেড।
                      </div>
                      <div className="overflow-hidden">
                        <strong>ঠিকানাঃ </strong>মুরাদপুর, মদনপুর, বন্দর,
                        নারায়নগঞ্জ, বাংলাদেশ।
                      </div>
                      <div>
                        <strong>বিআইএন(BIN) ঃ</strong>
                        ০০০০০০০১৫২৩৫০৩০২
                      </div>
                      <div>
                        <strong>পণ্যের এইচ এস কোডঃ </strong>
                        25-09-2023
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
                পণ্যের নাম
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                পরিমান
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                প্রকৃত মূল্য
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                প্রস্তাবিত মূল্য
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                অনুপযোগিতার কারণ
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
                  textAlign: "left",
                }}
              >
                (২)
              </td>

              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                (৩)
              </td>

              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
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
                  textAlign: "left",
                }}
              >
                (৬)
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
                    {formatDate(item?.fieldTwo)}
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
                      textAlign: "left",
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
                    {formatDate(item?.fieldSix)}
                  </td>
                  
                  
                </tr>
              ))}
          </tbody>
          ): (
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
                        src={('../../../../../search2img.png')}
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
            total={itemLength}
            onChange={handlePageChange}
            showSizeChanger
            onShowSizeChange={handlePageChange}
            style={{ marginTop: "16px", textAlign: "right", marginBottom: "15px" }}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default MushakFourFive;
