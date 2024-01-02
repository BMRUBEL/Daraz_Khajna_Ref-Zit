import * as yup from "yup";

export const businessInformationSchema = yup.object().shape({
  businessInfoName: yup.string().required("Business Information Name is required"),
  businessInfoNameBn: yup.string().required("Business Information Name BN is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
