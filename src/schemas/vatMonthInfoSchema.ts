import * as yup from "yup";

export const vatMonthInfoSchema = yup.object().shape({
  fyId: yup.number().required("Fiscal Year is required"),
  vmInfo: yup.string().required("VAT Month Name is required"),
  vmInfoBn: yup.string().required("VAT Month Name Bn is required"),
  seqNo: yup.number().required("Sequence Number is required"),
  fromDate: yup.string().required("From Date is required"),
  toDate: yup.string().required("To Date is required"),
});
