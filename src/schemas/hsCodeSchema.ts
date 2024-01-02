import * as yup from "yup";

export const hsCodeSchema = yup.object().shape({
 
  hsCodeChapter: yup.string().required("HS Code Chapter is required"),
  hsCodeHeading: yup.string().required("HS Code Heading is required"),
  productCategoryId: yup.string().required("Product Category is required"),
  hsCode: yup.string().required("HS Code  is required"),
  description: yup.string().required("Description is required"),
  descriptionBn: yup.string().required("Description Bn is required"),
  hsCodeSection: yup.string().required("HS Code Section is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
