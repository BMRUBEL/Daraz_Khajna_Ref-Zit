import * as yup from "yup";

export const tranTypeSchema = yup.object().shape({
  trnsSourceTypeId: yup.string().required("Tran Source Type Name is required"),
  trnsTypeName: yup.string().required("Transaction Type Name is required"),
  trnsTypeNameBn: yup.string().required("Transaction Type Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
