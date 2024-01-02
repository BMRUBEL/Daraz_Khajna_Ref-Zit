import * as yup from "yup";

export const mushakSixOneSchema = yup.object().shape({
  companyName: yup.string().required("Select Company Name"),
  nameBn: yup.string().required("Other Adjust Type Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
