import * as yup from "yup";

export const vdsPurchaseSchema = yup.object().shape({
  // vmId: yup.string().required("VAT Month is required"),
 
  supplierId: yup.string().required("Customer Name is required"),
  // commisionerateId: yup.string().required("Commissionerate Name is required"),
  // tcAcctCodeId: yup.string().required("Account Code is required"),
  // publishedDate: yup.date().required("Published Date is required"),
  // tableData: yup.array().of(
  //   yup.object().shape({
  //     issueMasterId: yup.number().required("Challan Number is required"),
  //     // Add other validation rules for fields inside the table row
     
  //   })
  // ),
  // totalVatAmount: yup.string().required("Total VAT Amount is required"),
  // totalDeductedVatAmount: yup.string().required("Total Deducted VAT Amount is required"),
});
