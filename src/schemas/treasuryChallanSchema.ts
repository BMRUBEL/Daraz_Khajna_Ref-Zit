import * as yup from "yup";

export const treasuaryChallan = yup.object().shape({
  treasuryChallanNo: yup.string().required("Treasury Challan No is required"),
  vatCodeId: yup.string().required("Vat Code is required"),
  tcAmount: yup.number().required("Treasury Amount is required"),
});
