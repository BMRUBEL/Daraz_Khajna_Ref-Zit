"use client";
import React from "react";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import {
  useMushakFourThreeQuery,
  useCompanyFourThreeDropdownQuery,
  useBranchFourThreeDropdownQuery,
  useStoreFourThreeDropdownQuery,
  useVatMonthFourThreeDropdownQuery,
  useIssueMasterFourThreeDropdownQuery
} from "@/redux/api/reportApi/mushakFourThreeApi";
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
const MushakSixThree = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedCompany, setselectedCompany] = useState(null);
  const [selectedBranch, setselectedBranch] = useState(null);
  const [selectedStore, setselectedStore] = useState(null);
  const [selectedVatMonth, setselectedVatMonth] = useState(null);
  const [selectedIssueMasterId, setselectedIssueMasterId] = useState(null);
  const [companyParameter, setCompanyParameter] = useState(null);
  const [branchParameter, setBranchParameter] = useState(null);
  const [storeParameter, setStoreParameter] = useState(null);
  const [vatMonthParameter, setVatMonthParameter] = useState(null);
  const [issueMasterParameter, setIssueMasterParameter] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [showMessage, setShowMessage]= useState(false)
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);
  const [pdfWindowOpened, setPdfWindowOpened] = useState(false);

 // query
 const query: Record<string, any> = {};
  // drop down data
  const { data: compdata } = useCompanyFourThreeDropdownQuery({ ...{}, });
  const { data: branchdata } = useBranchFourThreeDropdownQuery({ ...{}, });
  const { data: storedata } = useStoreFourThreeDropdownQuery({  ...{}, });
  const { data: vatdata } = useVatMonthFourThreeDropdownQuery({  ...{}, });
  const { data: issuemasterdata } = useIssueMasterFourThreeDropdownQuery({  ...{}, });
  const companyOptions =
    compdata &&
    compdata?.result.map((company: any) => {
      return {
        label: company?.companyName,
        value: parseInt(company?.companyId),
      };
    });
  const branchOptions =
    branchdata &&
    branchdata?.result.map((branch: any) => {
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
  const issueMasterOptions =
    issuemasterdata &&
    issuemasterdata?.result.map((issue: any) => {
      return {
        label: issue?.issueMasterId,
        value: parseInt(issue?.issueMasterId),
      };
    });

  const fetchPdfData = async (
    selectedCompany:any,
    selectedBranch:any,
    selectedStore:any,
    selectedVatMonth:any,
    selectedIssueMasterId: any
  ) => {
    console.log(selectedIssueMasterId, "pdf parameter");
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
      const newTab = window.open(pdfUrl, "_blank");
      if(newTab){
        newTab.focus();
      }else{
        window.location.href = pdfUrl;
      }
    }
  }, [pdfUrl, pdfWindowOpened]);
  //get grid view data
  const { data: reportData, refetch } = useMushakFourThreeQuery({
   companyId: companyParameter,
   branchId: branchParameter,
   storeId: storeParameter,
   vatMonthId: vatMonthParameter,
   issueMasterId: issueMasterParameter,
    size: pageSize,
    page: currentPage,
  });
  // Handler for fetching data
  const handleFetchData = () => {
    if (selectedCompany == null || selectedBranch == null || selectedStore == null || selectedVatMonth == null || selectedIssueMasterId == null ) {
      setShowReport(showReport);
      setShowMessage(true)
      setFetchDataTrigger(false);
    }else if(showReport== true){
      setCompanyParameter(selectedCompany)
      setBranchParameter(selectedBranch)
      setStoreParameter(selectedStore)
      setVatMonthParameter(selectedVatMonth)
      setselectedIssueMasterId(selectedIssueMasterId)
      setShowReport(true)
      setShowMessage(false)
      setFetchDataTrigger(true)
    } else {
      setCompanyParameter(selectedCompany)
      setBranchParameter(selectedBranch)
      setStoreParameter(selectedStore)
      setVatMonthParameter(selectedVatMonth)
      setIssueMasterParameter(selectedIssueMasterId)
      setShowReport(true)
      setShowMessage(false)
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
    fetchPdfData(selectedCompany, selectedBranch, selectedStore, selectedVatMonth, selectedIssueMasterId);
  };
  const musokData = reportData?.result?.content;
  const itemData = musokData?.[0]?.items;
  const itemLength = itemData?.lengths;
  // subTotal row data
  const subTotalSeven = reportData?.result?.subTotal?.subTotalSeven;
  const subTotalEleven = reportData?.result?.subTotal?.subTotalEleven;

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
            <h2>Mushak Report 4.3</h2>
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
                        options={issueMasterOptions}
                        label="Issue Master ID:  "
                        placeholder="Select Issue Master"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value: any) =>
                          setselectedIssueMasterId(value)
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
          {/* {showReport ? ( */}
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
                        style={{ width: "75px" }}
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
                            [উপকরণ-উৎপাদন সহগ (Input-Output Coefficient) ঘোষণা]
                          </strong>
                        </div>
                        <div>
                          <strong>(বিধি ২১ দ্রষ্টব্য)</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-11 col-end-13 text-center">
                    <p className="font-bold">মূসক-৪.৩</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 grid-flow-col gap-2 border p-4">
                  <div className="col-start-1 col-end-3 flex">
                    <div className="col-start-1 col-end-4 flex flex-col">
                      <div className="overflow-hidden">
                        <strong>প্রতিষ্ঠানের নামঃ</strong> বন্ধর স্টিল
                        ইন্ডাস্ট্রিজ লিমিটেড।
                      </div>
                      <div className="overflow-hidden">
                        <strong>ঠিকানাঃ </strong>মুরাদপুর, মদনপুর, বন্দর,
                        নারায়নগঞ্জ, বাংলাদেশ।
                      </div>
                      <div>
                        <strong>বিন(BIN):</strong>
                        ০০০০০০০১৫২৩৫০৩০২
                      </div>
                      <div>
                        <strong>দাখিলের তারিখঃ </strong>
                        25-09-2023
                      </div>
                      <div>
                        <strong>
                          ঘোষিত সহগ অনুযায়ী পণ্য/সেবার প্রথম সরবরাহের তারিখঃ{" "}
                        </strong>
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
                পণ্যের এইচ এস কোড/সেবা কোড
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                সরবরাহতব্য পণ্যের নাম ও বর্ণনা (প্রযোজ্য ক্ষেত্রে ব্র্যান্ড নাম
                সহ)
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                সরবরাহের একক
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                উপকরণ/কাঁচামালের ও প্যাকিং সামগ্রীর বিবরণ
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                উপকরণ/কাঁচামালের ও প্যাকিং সামগ্রীর অপচয় সহ পরিমান
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                উপকরণ/কাঁচামালের ও প্যাকিং সামগ্রীর ক্রয় মূল্য
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                উপকরণ/কাঁচামালের ও প্যাকিং সামগ্রীর অপচয়ের পরিমান
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                উপকরণ/কাঁচামালের ও প্যাকিং সামগ্রীর শতকরা হার
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                মূল্য সংযোজনের খাত
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                মূল্য
              </th>

              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                মন্তব্য
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
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                (৭)
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                (৮)
              </td>

              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                (৯)
              </td>

              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                (১০)
              </td>

              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                (১১)
              </td>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                (১২)
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
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldSeven}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldEight}
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
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldTen}
                  </td>

                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldEleven}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldTwelve}
                  </td>
                  
                </tr>
              ))}

            {/* Total */}

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
                  textAlign: "right",
                }}
                colSpan={6}
              >
                মোট-
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {subTotalEleven}
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
                colSpan={3}
              ></th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              >
                {subTotalEleven?.toFixed(2)}
              </th>
              <th
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  textAlign: "left",
                }}
              ></th>
            </tr>
            <tr>
              <td colSpan={12}>
                <div className="grid grid-cols-3 grid-flow-col gap-2 border p-4">
                  <div className="col-start-1 col-end-4 flex flex-col">
                    <div className="grid   text-sm/[25px] overflow-hidden">
                      <p>
                        <strong>
                          প্রতিষ্ঠানের দায়িত্বপ্রাপ্ত ব্যাক্তির নামঃ
                        </strong>
                      </p>
                      <p>
                        <strong>পদবীঃ</strong>
                      </p>
                      <strong>স্বাক্ষরঃ </strong>
                      <div className="grid mb-5">
                        <strong>সীলঃ</strong>
                      </div>
                    </div>
                    <div>
                      <strong>বিষেশ দ্রষ্টব্য:</strong>
                      <p>
                        <strong>
                          ১।যেকোন পণ্য বা সেবা প্রথম সরবরাহের পূর্ববর্তী পনেরো কার্যদিবসের মধ্যে অনলাইনে মূসক কম্পিউটার সিস্টেমে বা সংশ্লিষ্ট বিভাগীয় কর্মকর্তা দপ্তরে উপকরণ সহগ ঘোষণা দাখিল করিতে হইবে।
                        </strong>
                      </p>
                      <p><strong>২। পণ্য মূল্য বা মোট উপকরণ/কাঁচামালের মূল্য ৭.৫% এর বেশি পরিবর্তন হইলে নতুন ঘোষণা দাখিল করিতে হইবে।</strong></p>
                      <p><strong>৩। উপকরণ ক্রয়ের স্বপক্ষে প্রামানিক দলিল হিসাবে বিল অব এন্ট্রি বা মূসক চালানপত্রের কপি সংযুক্ত করিতে হইবে।</strong></p>
                    </div>
                   
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          {/* ): ( */}
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
          {/* )} */}
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

export default MushakSixThree;
