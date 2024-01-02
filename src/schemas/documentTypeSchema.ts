import * as yup from "yup";

export const documentTypeSchema = yup.object().shape({
  docType: yup.string().required("Document Type Name is required"),
  docTypeBn: yup.string().required("Document Type Name BN is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
