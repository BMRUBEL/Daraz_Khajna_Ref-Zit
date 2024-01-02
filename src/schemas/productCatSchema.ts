import * as yup from "yup";
export const productCatSchema = yup.object().shape({
  name: yup.string().required("Product Cat Name is required"),
  nameBn: yup.string().required("Product Cat Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});


