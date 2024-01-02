"use client";
import React, { useEffect } from "react";
import { Pagination } from 'antd';
import { useState } from "react";
import {
  useMushakSixTwoQuery,
  useSixTwoCompDropdownQuery,
  useSixTwoBranchDropdownQuery,
  useSixTwoStoreDropdownQuery,
  useSixTwoMonthDropdownQuery,
} from "@/redux/api/reportApi/mushakSixTwoApi";
import { getUserInfo } from "@/services/auth.service";
import { Col, Row, Image } from "antd";
import Form from "@/components/Forms/Form";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Loading from "@/app/loading";
import Link from "next/link";
import { FilePdfOutlined } from "@ant-design/icons";
import DarazReportButton from "@/components/ui/DRZReportButton";
interface TableProps {
  columns: string[];
  rows: Record<string, any>[];
}

const MushakSixTwo = () => {
  const { role } = getUserInfo() as any;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5)
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfWindowOpened, setPdfWindowOpened] = useState(false);
  const [companyParameter, setCompanyParameter] = useState(null);
  const [branchParameter, setBranchParameter] = useState(null);
  const [vatParameter, setVatParameter] = useState(null);
  const [storeParameter, setStoreParameter] = useState(null);
  const [showReport, setShowReport] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [selectedCompany, setSelectedCompany] =useState(null)
  const [selectedBranch, setSelectedBranch] =useState(null)
  const [selectedMonthId, setSelectedMonthId] =useState(null)
  const [selectedStoreId, setSelectedStoreId] =useState(null)
  const [fetchDataTrigger, setFetchDataTrigger] = useState(false);
  // query
  const query: Record<string, any> = {};
  //get grid view data
  const { data: reportData, refetch } = useMushakSixTwoQuery({
   ...query,
   companyId: companyParameter,
   branchId: branchParameter,
   vatMonthId: vatParameter,
   storeId: storeParameter,
   size:pageSize,
   page:currentPage,
  });

  const musokData = reportData?.result?.content;
  const itemData = musokData?.[0]?.items;
  const itemTotalData = musokData?.[0]?.items?.length;
  console.log(itemTotalData, "child Data");
// table header data
  const leftOne = musokData?.[0]?.fieldLeftOne;
  const leftTwo = musokData?.[0]?.fieldLeftTwo;
  const leftThree = musokData?.[0]?.fieldLeftThree;
  const leftFour = musokData?.[0]?.fieldLeftFour;
  const productName = musokData?.[0]?.fieldCenterOne;
  // subTotal row data
  const subTotalThree= reportData?.result?.subTotal?.subTotalThree;
  const subTotalFour= reportData?.result?.subTotal?.subTotalFour;
  const subTotalFive= reportData?.result?.subTotal?.subTotalFive;
  const subTotalSix= reportData?.result?.subTotal?.subTotalSix;
  const subTotalSeven= reportData?.result?.subTotal?.subTotalSeven;
  const subTotalEight= reportData?.result?.subTotal?.subTotalEight;
  const subTotalFifteen= reportData?.result?.subTotal?.subTotalFifteen;
  const subTotalSixteen= reportData?.result?.subTotal?.subTotalSixteen;
  const subTotalSeventeen= reportData?.result?.subTotal?.subTotalSeventeen;
  const subTotalEighteen= reportData?.result?.subTotal?.subTotalEighteen;
  const subTotalNineteen= reportData?.result?.subTotal?.subTotalNineteen;
  const subTotalTwenty= reportData?.result?.subTotal?.subTotalTwenty;
  
  console.log(musokData, "row data")
  
  const { data: companydata } = useSixTwoCompDropdownQuery({
    ...{},
  });
  const { data: branchdata } = useSixTwoBranchDropdownQuery({
    ...{},
  });
  const { data: vatmonth } = useSixTwoMonthDropdownQuery({
    ...{},
  });
  const { data: storedata } = useSixTwoStoreDropdownQuery({
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
        label: vatmonth?.vm_info,
        value: parseInt(vatmonth?.vatMonthId),
      };
    });
 //Need this for form field
  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // if (isLoading) {
  //   return <Loading />;
  // }
  // static design showing
  useEffect(() => {
    if (fetchDataTrigger) {
      refetch();
      setFetchDataTrigger(false);
    }
  }, [fetchDataTrigger, refetch]);
 // Handler for fetching data
 const handeleShowReport = () => {
  if (selectedCompany== null || selectedBranch == null || selectedMonthId == null || selectedStoreId == null) {
    setShowReport(showReport);
    setShowMessage(true)
    setFetchDataTrigger(false);
  }else if(showReport=== true ){
    setCompanyParameter(selectedCompany)
    setBranchParameter(selectedBranch)
    setVatParameter(selectedMonthId)
    setStoreParameter(selectedStoreId)
    setShowReport(true);
    setShowMessage(false)
    setFetchDataTrigger(true);
  }else{
    setCompanyParameter(selectedCompany)
    setBranchParameter(selectedBranch)
    setVatParameter(selectedMonthId)
    setStoreParameter(selectedStoreId)
    setShowReport(true);
    setShowMessage(false)
    setFetchDataTrigger(true);
  }
};

  const onSubmit = () => { };

  const fetchPdfData = async (selectedCompany:any, selectedBranch:any, selectedMonthId:any, selectedStoreId:any,) => {
    console.log(selectedMonthId, selectedStoreId, "pdf parameter")
    try {
      const response = await fetch(
        `http://192.168.10.10:8181/report/api/v1/mushak-six-two/gen-pdfs?companyId=${selectedCompany}&branchId=${selectedBranch}&storeId=${selectedStoreId}&vatMonthId=${selectedMonthId}`,
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
  
  const handleFetchPdf = () => {
    fetchPdfData(selectedCompany, selectedBranch, selectedMonthId, selectedStoreId);
  };
  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); 
    const month = ('0' + (date.getMonth() + 1)).slice(-2); 
    const day = ('0' + date.getDate()).slice(-2); 
    return `${year}-${month}-${day}`; 
  };
  // pagination
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentItems = itemData ? itemData.slice(indexOfFirstItem, indexOfLastItem): [];
  console.log(indexOfFirstItem, "first item", indexOfLastItem, "last item", currentPage, "current page")
  console.log(currentItems, "mushok Data")

  const handlePageChange = async (pageNumber:any, pageSize:any) => {
    console.log("current page", pageNumber,  "page size",pageSize)
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
            <h2>Mushak Report 6.2</h2>
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
                        onChange={(value:any) => setSelectedMonthId(value)}
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
                     <DarazReportButton onClick={handeleShowReport}>
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
                <td colSpan={21}>
                  <div className="grid grid-cols-12 grid-flow-col gap-0  border p-4 mb-5">
                    <div className="col-start-1 col-end-4 flex flex-col">
                      <div className="overflow-hidden">
                        <strong>প্রতিষ্ঠানের নামঃ</strong> {leftOne}
                      </div>
                      <div className="overflow-hidden">
                        <strong>ঠিকানাঃ </strong>{leftTwo}
                      </div>
                      <div>
                        <strong>ব্যবসা সনাক্তকরণের সংখ্যাঃ </strong>
                        {leftThree}
                      </div>
                    </div>
                    <div className="col-start-4 col-end-11 text-center">
                      <div>
                        <strong className="text-center">বিক্রয় হিসাব পুস্তক</strong>
                      </div>
                      <div>
                        <strong>
                          (পণ্য বা সেবা প্রক্রিয়াকরণে সম্পৃক্ত এমন বা তালিকা ভুক্ত
                          ব্যক্তির জন্য প্রযোজ্য)
                        </strong>
                      </div>
                      <div>
                        <strong>
                          [বিধি ৪০ এর ‍উপবিধি (১) এর দফা (ক) এবং ৪১ এর দফা (ক) দ্রষ্টব্য]
                        </strong>
                      </div>
                    </div>
                    <div className="col-start-11 col-end-13 text-center">
                      <p className="font-bold">মূসক-৬.২</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 grid-flow-col gap-2 border p-4">
                    <div className="col-start-1 col-end-3 flex">
                      <p className="font-bold mr-1">VAT Month: </p>
                      <span> {leftFour}</span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "12px",
                    textAlign: "center",
                    backgroundColor: "rgb(220,220,220)",
                    lineHeight: 2,
                  }}
                  colSpan={21}
                >
                  <p className="font-bold text-lg"> পণ্য/সেবার উপকরণ বিক্রয় </p>
                </th>
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
                  প্রারম্ভিক পরিমাণ (একক)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  প্রারম্ভিক মূল্য (সকল প্রকার কর ব্যতীত)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 উৎপাদিত পণ্যের পরিমাণ (একক) চালানপত্র/বিল অব এন্ট্রি নম্বর
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  উৎপাদিত পণ্যের মূল্য (সকল প্রকার কর ব্যতীত)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 মোট উৎপাদিত পণ্যের পরিমাণ (একক)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  মোট উৎপাদিত পণ্য/সেবার মূল্য (সকল প্রকার কর ব্যতীত)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  ক্রেতা/সরবরাহ-গ্রহীতার নাম
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 ক্রেতা/সরবরাহ-গ্রহীতার ঠিকানা
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 নিবন্ধন/তালিকাভূক্তি/জাতীয় পরিচয় পত্র নং
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  চালান পত্রের নম্বর
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 চালান পত্রের তারিখ
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
                  করযোগ্য মূল্য
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                   সম্পূরক শুল্ক (যদি থাকে)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  মূসক
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  পণ্যের প্রান্তিক পরিমাণ (একক)
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 পণ্যের প্রান্তিক মূল্য (সকল প্রকার কর ব্যতীত)
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
                  (৭)=(৩+৫)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (৮)=(৪+৬)
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
                  (১৯)=(৭-১৫)
                </td>
                <td
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  (২০)=(৮-১৬)
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
                    {item?.fieldFour?.toFixed(2)}
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
                  >{item?.fieldEight?.toFixed(2)}</td>

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
                     {item?.fieldTwelve}
                  </td>
                  <td
                    style={{
                      border: "1px solid #ccc",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    {new Date(item.fieldThirteen).toLocaleDateString('en-US')} 
                    
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
                     {item?.fieldFifteen}
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
                    
                    {item?.fieldEighteen?.toFixed(2)}
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
                    {item?.fieldTwenty?.toFixed(2)}
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
                  colSpan={2}
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
                {subTotalThree}
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 {subTotalFour?.toFixed(2)}
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
                >
                  {subTotalEight?.toFixed(2)}
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
                  {subTotalFifteen}
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
                >
                 {subTotalEighteen?.toFixed(2)}
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                 {subTotalNineteen}
                </th>
                <th
                  style={{
                    border: "1px solid #ccc",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  {subTotalTwenty?.toFixed(2)}
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
          )
            : (<tr>
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
        style={{ marginTop: '16px', textAlign: 'right', marginBottom:"15px"}} 
      />
        ):("")
}
      </div>
    </>
  );
};

export default MushakSixTwo;
