import * as yup from "yup";

export const vatrateStageSchema = yup.object().shape({

  productCategoryId: yup.string().required("Product Category Name is required"),
  name: yup.string().required("Vat Rate Stage Name is required"),
  nameBn: yup.string().required("Vat Rate Stage Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
