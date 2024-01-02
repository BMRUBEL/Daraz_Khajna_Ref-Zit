import * as yup from "yup";

export const importLcforSchema = yup.object().shape({
  purpose: yup.string().required("Purpose is required"),
   forUse: yup.string().required("For Use is required"),
  seqNo: yup.number().required("Sequence Number is required"),
   
});
