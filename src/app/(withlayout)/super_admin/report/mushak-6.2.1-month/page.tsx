"use client";
import React from "react";
import { Pagination } from 'antd';
import { useState, useEffect } from "react";
import {
  useMushakSixTwoOneQuery,
  useSixTwoOneCompDropdownQuery,
  useSixTwoOneBranchDropdownQuery,
  useSixTwoOneStoreDropdownQuery,
  useSixTwoOneVatDropdownQuery
} from "@/redux/api/reportApi/mushakSixTwoOneApi";
import { Col, Row, Image } from "antd";
import Form from "@/components/Forms/Form";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Loading from "@/app/loading";
import Link from "next/link";
import { FilePdfOutlined } from "@ant-design/icons";
import '@react-pdf-viewer/core/lib/styles/index.css';
import DarazReportButton from "@/components/ui/DRZReportButton";
interface TableProps {
  columns: string[];
  rows: Record<string, any>[];
}
const MushakSixTwoOneMonth = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5)
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [selectedVatMonthId, setSelectedVatMonthId] = useState(null);
  const [companyParameter, setCompanyParameter]= useState(null);
  const [branchParameter, setBranchParameter]= useState(null);
  const [storeParameter, setStoreParameter]= useState(null);
  const [vatParameter, setVatParameter]= useState(null);
  const [showReport, setShowReport] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);
  const [pdfWindowOpened, setPdfWindowOpened] = useState(false);

  const fetchPdfData = async (selectedCompany:any, selectedBranch:any, selectedStoreId:any, selectedVatMonthId:any,) => {
    console.log(selectedVatMonthId, selectedStoreId, "pdf parameter")
    try {
      const response = await fetch(
        `http://192.168.10.10:8181/report/api/v1/mushak-six-two-one/gen-pdfs?companyId=${selectedCompany}&branchId=${selectedBranch}&storeId=${selectedStoreId}&vatMonthId=${selectedVatMonthId}`,
        {
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjgsImVtYWlsIjoicm9iaXVsQHppdC5jb20iLCJzdWIiOiJyb2JpdWxAeml0LmNvbSIsImlhdCI6MTY5ODk5MjcyMywiZXhwIjoxNzMwNTI4NzIzfQ.ED6tCBxtBXVjFlfgSp-aRp7u_S4_d1nFfnSMcNpQYus"}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }

      const pdfBlob = await response.blob();
      const pdfUrl:any = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);

      setPdfWindowOpened(true);
    } catch (error) {
      console.error('Error fetching PDF:', error);
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
  // query
  const query: Record<string, any> = {};
  //get grid view data
  const { data: reportData, refetch } = useMushakSixTwoOneQuery({
    companyId: companyParameter,
    branchId: branchParameter,
    storeId: storeParameter,
    vatMonthId: vatParameter,
    size: pageSize,
    page: currentPage
  });

  // Handler for fetching data
  const handleFetchData = () => {
    if (selectedCompany== null || selectedBranch== null || selectedStoreId== null || selectedVatMonthId == null) {
      setShowReport(showReport);
      setShowMessage(true)
      setFetchDataTrigger(false);
    
    }else if(showReport=== true ){
      setCompanyParameter(selectedCompany)
      setBranchParameter(selectedBranch)
      setStoreParameter(selectedStoreId)
      setVatParameter(selectedVatMonthId)
      setShowReport(true);
      setShowMessage(false)
      setFetchDataTrigger(true);
    }else{
      setCompanyParameter(selectedCompany)
      setBranchParameter(selectedBranch)
      setStoreParameter(selectedStoreId)
      setVatParameter(selectedVatMonthId)
      setShowReport(true);
      setShowMessage(false)
      setFetchDataTrigger(true);
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
    fetchPdfData(selectedCompany, selectedBranch, selectedStoreId, selectedVatMonthId);
  };

  const musokData = reportData?.result?.content;
  const itemData = musokData?.[0]?.items;
  const itemTotalData = itemData?.length;
  console.log(itemTotalData, "child Data");
// table header data
  const leftOne = musokData?.[0]?.fieldLeftOne;
  const leftTwo = musokData?.[0]?.fieldLeftTwo;
  const leftThree = musokData?.[0]?.fieldLeftThree;
  const leftFour = musokData?.[0]?.fieldLeftFour;
  // subTotal row data
  const subTotalFour = reportData?.result?.subTotal?.subTotalFour;
  const subTotalFive = reportData?.result?.subTotal?.subTotalFive;
  const subTotalSix = reportData?.result?.subTotal?.subTotalSix;
  const subTotalSeven = reportData?.result?.subTotal?.subTotalSeven;
  const subTotalFourteen = reportData?.result?.subTotal?.subTotalFourteen;
  const subTotalFifteen = reportData?.result?.subTotal?.subTotalFifteen;
  const subTotalSixteen = reportData?.result?.subTotal?.subTotalSixteen;
  const subTotalSeventeen = reportData?.result?.subTotal?.subTotalSeventeen;
  const subTotalTwentyThree = reportData?.result?.subTotal?.subTotalTwentyThree;

  console.log(musokData, "row data")
  const { data: companydata } = useSixTwoOneCompDropdownQuery({
    ...{},
  });
  const { data: branchdata } = useSixTwoOneBranchDropdownQuery({
    ...{},
  });
  const { data: vatmonth } = useSixTwoOneVatDropdownQuery({
    ...{},
  });
  const { data: storedata } = useSixTwoOneStoreDropdownQuery({
    ...{},
  });

  const companyOptions =
    companydata &&
    companydata?.result.filter((company:any)=>  company?.companyId!==null).map((company: any) => {
      return {
        label: company?.companyN,
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
    vatmonth &&
    vatmonth?.result.filter((vatmonth:any)=>  vatmonth?.vatMonthId!==null).map((vatmonth: any) => {
      return {
        label: vatmonth?.vmInfo,
        value: parseInt(vatmonth?.vatMonthId),
      };
    });

  //Need this for form field
  const onSubmit = () => { };
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
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2); 
    return `${year}-${month}-${day}`; 
  };
  // pagination
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = itemData?.slice(indexOfFirstItem, indexOfLastItem);
  console.log(indexOfFirstItem, "first item", indexOfLastItem, "last item", currentPage, "current page")
  console.log(currentItems, "mushok Data")

  const handlePageChange = async (pageNumber: any, pageSize: any) => {
    console.log("current page", pageNumber, "page size", pageSize)
    setCurrentPage(pageNumber);
    setPageSize(pageSize)

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
            <h2>Mushak Report 6.2.1</h2>
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
          ) : ("")}
        </div>

        <table
          style={{
            borderCollapse: "collapse",
            minWidth: '100%',
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
              colSpan={24}
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
                      span={5}
                      style={{
                        paddingLeft: "10px",
                        marginBottom: "20px",
                        minWidth: "0",
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "80%",
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
                        onChange={(value:any) => setSelectedCompany(value)}
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={5}
                      style={{
                        marginBottom: "20px",
                        position: "relative",
                        zIndex: 1
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "80%",
                          textAlign: "left",
                        }}
                        name=""
                        options={branchOptions}
                        label="Branch Name:  "
                        placeholder="Select Branch"
                        onChange={(value:any) => setSelectedBranch(value)}
                        filterOption={filterOption}
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={5}
                      style={{
                        paddingLeft: "10px",
                        marginBottom: "20px",
                        minWidth: "0",
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "80%",
                          position: "relative",
                          zIndex: 1,
                          textAlign: "left",
                        }}
                        name=""
                        options={storeOptions}
                        label="Store Name: "
                        placeholder="Select Store"
                        onSearch={onSearch}
                        filterOption={filterOption}
                        onChange={(value:any) => setSelectedStoreId(value)}
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={5}
                      style={{
                        marginBottom: "20px",
                        position: "relative",
                        zIndex: 1
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "80%",
                          textAlign: "left",
                        }}
                        name=""
                        options={vatMonthOptions}
                        label="VAT Month:  "
                        placeholder="Select VAT Month"
                        onChange={(value:any) => setSelectedVatMonthId(value)}
                        filterOption={filterOption}
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={4}
                      style={{
                        marginTop: "10px",
                        textAlign: "left",
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
                <td colSpan={24}>
                  <div className="grid grid-cols-12 grid-flow-col gap-0  border p-4 mb-5">
                    <div className="col-start-1 col-end-4 flex flex-col">
                      <div className="overflow-hidden">
                        <strong>প্রতিষ্ঠানের নামঃ</strong>{leftOne}
                      </div>
                      <div className="overflow-hidden">
                        <strong>ঠিকানাঃ </strong>{leftTwo}
                      </div>
                      <div>
                        <strong>ব্যবসা সনাক্তকরণের সংখ্যাঃ</strong>
                        {leftThree}
                      </div>
                    </div>
                    <div className="col-start-4 col-end-11 text-center">
                      <div>
                        <strong className="text-center">ক্রয়-বিক্রয় হিসাব পুস্তক</strong>
                      </div>
                      <div>
                        <strong>
                          (পণ্য বা সেবা প্রক্রিয়াকরণে সম্পৃক্ত নয় (ব্যবসায়ী) এমন নিবন্ধিত বা তালিকাভুক্ত
                          ব্যক্তির জন্য প্রযোজ্য)
                        </strong>
                      </div>
                      <div>
                        <strong>
                          [বিধি ৪০(১) এর দফা (ক) এবং ৪১ এর দফা (খখ) দ্রষ্টব্য]
                        </strong>
                      </div>
                    </div>
                    <div className="col-start-11 col-end-13 text-center">
                      <p className="font-bold">মূসক-৬.২.১</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 grid-flow-col gap-2 border p-4">
                    <div className="col-start-1 col-end-3 flex">
                      <p className="font-bold">VAT Month: </p>
                      <span> {leftFour}</span>
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
                  তারিখ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 বিক্রয় যোগ্য পণ্যের প্রারম্ভিক বিবরণ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বিক্রয় যোগ্য পণ্যের প্রারম্ভিক পরিমাণ (একক)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 ক্রয় পরিমাণ (একক)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  ক্রয় মূল্য (সকল প্রকার কর ব্যতীত)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 মোট পণ্য পরিমাণ (একক) 
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 বিক্রেতার নাম 
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                বিক্রেতার ঠিকানা
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বিক্রেতার নিবন্ধন/তালিকাভূক্তি/জাতীয় পরিচয় পত্র নং
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                ক্রয় চালান পত্রের নম্বর
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 ক্রয় চালান পত্রের তারিখ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বিক্রিত পণ্যের বিবরণ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  বিক্রিত পণ্যের পরিমান
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                বিক্রিত পণ্যের করযোগ্য মূল্য
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 বিক্রিত পণ্যের সম্পূরক শুল্ক (যদি থাকে)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 বিক্রিত পণ্যের মূসক
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  ক্রেতার নাম
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  ক্রেতার ঠিকানা
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                   ক্রেতার নিবন্ধন/তালিকাভূক্তি/জাতীয় পরিচয় পত্র নং
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 বিক্রয় চালান পত্রের নম্বর
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                বিক্রয় চালান পত্রের তারিখ
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 পণ্যের প্রারম্ভিক পরিমাণ (একক)
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
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (১৩)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (১৪)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (১৫)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (১৬)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (১৭)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (১৮)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (১৯)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (২০)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (২১)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (২২)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (২৩)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (২৪)
                </td>
              </tr>
              {/* table */}

              {currentItems && currentItems.map((item: any, index: any) => (
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
                    {new Date(item.fieldTwo).toLocaleDateString('en-US')} 
                    {/* {formatDate(item?.fieldTwo)} */}
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
                    {/* {item?.fieldSix} */}
                    {item?.fieldSix?.toFixed(2)}
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
                  >{item?.fieldEight}</td>

                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >{item?.fieldNine}</td>

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
                    {formatDate(item?.fieldTwelve)}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldThirteen}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldFourteen}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldFifteen?.toFixed(2)}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldSixteen?.toFixed(2)}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldSeventeen?.toFixed(2)}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >

                    {item?.fieldEighteen}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldNineteen}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldTwenty}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldTwentyOne}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldTwentyTwo}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldTwentyThree}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {item?.fieldTwentyFour}
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
                  colSpan={3}
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
                  {subTotalFour}
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {subTotalFive}
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {subTotalSix?.toFixed(2)}
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {subTotalSeven}
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                  colSpan={6}
                >
                  
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {subTotalFourteen}
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {subTotalFifteen?.toFixed(2)}
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {subTotalSixteen?.toFixed(2)}
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {subTotalSeventeen?.toFixed(2)}
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                  colSpan={5}
                >
                  
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {subTotalTwentyThree}
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                ></th>
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
                <div className="border p-4 mb-5"
                  style={{ height: "100%" }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ paddingTop: "50px" }}>
                    <Image
                        src={('../../../../../search2img.png')}
                        alt="Img"
                        style={{ width: "190px", transform: "rotate(350deg)" }}
                        preview={false}
                      />
                    </div>
                    <div style={{ fontSize: "50px", paddingLeft: "25px", paddingTop: "10px" }}>
                      You Don't Find Any Result
                      <div style={{ fontSize: "22px" }}>Fill up All Field And View Your Report</div>
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
            style={{ marginTop: '16px', textAlign: 'right', marginBottom:"15px" }}
          />
        ) : ("")
        }
      </div>
    </>
  );
};

export default MushakSixTwoOneMonth;
