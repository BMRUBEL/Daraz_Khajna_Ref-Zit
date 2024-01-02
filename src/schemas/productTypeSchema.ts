import * as yup from "yup";

export const productTypeSchema = yup.object().shape({
  productCategoryId: yup.string().required("Product Category Name is required"),
  name: yup.string().required("Product Type Name is required"),
  nameBn: yup.string().required("Product Type Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
