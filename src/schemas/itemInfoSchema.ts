import * as yup from "yup";

export const itemInfoSchema = yup.object().shape({
  trnsSourceTypeId: yup.string().required("tran source type_id is required"),
  trnsTypeName: yup.string().required("Transaction Type Name is required"),
  trnsTypeNameBn: yup.string().required("Transaction Type Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
