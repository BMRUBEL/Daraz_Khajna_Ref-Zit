import * as yup from "yup";
export const createReceiveSchema = yup.object().shape({
  receiveDate: yup.string().required("Receive Date is required"),
  isVdsApplicable: yup.string().required("isVdsApplicable is required"),
  remarks: yup.string().required("Remarks is required"),
  challanNumber: yup.string().required("Challan Number is required"),
  payInstrumentDate: yup.string().required("Pay Instrument Date is required"),
  payInstrumentNo: yup.string().required("Cheque/RTGS/Pay Order No is required"),
  challanDate: yup.string().required("Challan Date is required"),
  isRebateable: yup.number().required("is Rebateable is required"),
  supplierId: yup.number().required("Supplier id is required"),
  supplierBinNumber: yup.number().required("Supplier Bin Number is required"),
  challanTypeId: yup.number().required("Challan Type is required"),
  prodTypeId: yup.number().required("ProdTypeId required"),
  payModeId: yup.number().required("Payment Mode required"),
  bankBranchId: yup.number().required("Bank Name is required"),
  bankAccountTypeId: yup.number().required("Bank Account Type is required"),
});

