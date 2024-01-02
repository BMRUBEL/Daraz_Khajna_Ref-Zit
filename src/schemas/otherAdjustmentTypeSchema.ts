import * as yup from "yup";

export const otherAdjustmentTypeSchema = yup.object().shape({
  name: yup.string().required("Other Adjust Type Name is required"),
  nameBn: yup.string().required("Other Adjust Type Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
