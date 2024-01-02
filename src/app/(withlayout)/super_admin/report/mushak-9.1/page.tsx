"use client";
import React from "react";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import {
  useCompanyNineOneDropdownQuery,
  useBranchNineOneDropdownQuery,
  useVatMonthNineOneDropdownQuery,
} from "@/redux/api/reportApi/mushakNineOneApi";
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
const MushakNineOne = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedCompany, setselectedCompany] = useState(null);
  const [selectedBranch, setselectedBranch] = useState(null);
  const [selectedVatMonth, setselectedVatMonth] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [pdfWindowOpened, setPdfWindowOpened] = useState(false);

  // query
  const query: Record<string, any> = {};
  // drop down data
  const { data: compdata } = useCompanyNineOneDropdownQuery({ ...{} });
  const { data: branchdata } = useBranchNineOneDropdownQuery({ ...{} });
  const { data: vatdata } = useVatMonthNineOneDropdownQuery({ ...{} });

  const companyOptions =
    compdata &&
    compdata?.result.map((company: any) => {
      return {
        label: company?.companyN,
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

  const vatMonthOptions =
    vatdata &&
    vatdata?.result
      .filter((vatmonth: any) => vatmonth?.vatMonthId !== null)
      .map((vatmonth: any) => {
        return {
          label: vatmonth?.vm_info,
          value: parseInt(vatmonth?.vatMonthId),
        };
      });

  const fetchPdfData = async (
    selectedCompany: any,
    selectedBranch: any,
    selectedVatMonth: any
  ) => {
    console.log(selectedVatMonth, "pdf parameter");
    try {
      const response = await fetch(
        `http://192.168.10.10:8181/report/api/v1/mushak-nine-one/gen-pdf?companyId=${selectedCompany}&branchId=${selectedBranch}&vatMonthId=${selectedVatMonth}`,
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
      if (newTab) {
        newTab.focus();
      } else {
        window.location.href = pdfUrl;
      }
    }
  }, [pdfUrl, pdfWindowOpened]);

  // Handler for fetching data
  const handleFetchPdf = () => {
    
    if (selectedCompany == null || selectedBranch == null ||  selectedVatMonth == null) {
        setShowReport(showReport);
        setShowMessage(true)
      }else if(showReport== true){
        fetchPdfData(selectedCompany, selectedBranch, selectedVatMonth);
        setShowReport(true)
        setShowMessage(false)
      } else {
        fetchPdfData(selectedCompany, selectedBranch, selectedVatMonth);
        setShowReport(true)
        setShowMessage(false)
      }
  };
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
            <h2>Mushak Report 9.1</h2>
          </div>
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
                      span={6}
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
                        onChange={(value: any) => setselectedCompany(value)}
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
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
                        onChange={(value: any) => setselectedBranch(value)}
                        required
                      />
                    </Col>

                    <Col
                      className="gutter-row"
                      span={6}
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
                        onChange={(value: any) => setselectedVatMonth(value)}
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        display: "flex",
                        paddingLeft: "20px",
                        marginTop: "10px",
                        justifyContent: "center",
                      }}
                    >
                      
                        <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "6px 12px 6px 12px",
                          backgroundColor: "#C8091C",
                          border: "none",
                          cursor: "pointer",
                          color: "white",
                          borderRadius: "5px",
                        }}
                        onClick={handleFetchPdf}
                      >
                        <FilePdfOutlined style={{ fontSize: "22px" }} />
                        <span style={{ marginLeft: "10px" }}>PDF</span>
                      </button>
                      
                   
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
            ""
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
      </div>
    </>
  );
};

export default MushakNineOne;
