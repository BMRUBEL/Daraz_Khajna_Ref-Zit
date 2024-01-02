import * as yup from "yup";

export const othersadjustmentSchema = yup.object().shape({
  name: yup.string().required("Other Adjust Name is required"),
  nameBn: yup.string().required("Other Adjust Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
