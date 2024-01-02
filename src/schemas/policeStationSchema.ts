import * as yup from "yup";

export const policeStationSchema = yup.object().shape({
  districtId: yup.string().required("District Name is required"),
  psName: yup.string().required("Police Station Name is required"),
  psNameBn: yup.string().required("Police Station Name BN is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
