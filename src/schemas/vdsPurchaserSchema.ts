import * as yup from "yup";

export const vdsPurchaserSchema = yup.object().shape({
  recvMasterId: yup.string().required("VDS Purchaser ID is required"),
  transactionDate: yup.string().required("Transaction Date is required"),
  vatMonth: yup.string().required("VAT Month is required"),
  supplierName: yup.string().required("Supplier Name is required"),
  certificateNo: yup.string().required("Certificate Number is required"),
  totalPerchaseAmount: yup.string().required("Total Purchase amount is required"),
  totalVatAmount: yup.string().required("Total Vat Amount is required"),
  deductVatAmount: yup.string().required("Deduct Vat Amount is required"),
});
