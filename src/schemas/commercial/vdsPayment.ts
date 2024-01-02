import * as yup from "yup";

export const vdsPaymentSchema = yup.object().shape({
  bankId: yup.string().required("Bank Name is required"),
  bankBrunchId: yup.string().required("Bank Branch Name is required"),
  treasuryChallanNo: yup.string().required("Treasury Challan No is required"),
  commissionerateId: yup.string().required("Commissionerate Name is required"),
  vatCodeId: yup.string().required("VAT Code is required"),
});
