import * as yup from "yup";

export const utilizationDeclarationSchema = yup.object().shape({
  treasuryChallanNo: yup.string().required("UD Register No is required"),
  bankBrunchId: yup.string().required("Customer Name is required"),
  bankId: yup.number().required("Export LC NO is required"),
});
